// Board.js
import React, { useState, useEffect } from 'react';
import { fetchData } from '../utils/api';
import Card from './Card';
import Filter from './Filter';
import { FaEllipsisH, FaPlus } from 'react-icons/fa';
import './Board.css';

const Board = () => {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState('group-status');
  const [orderingOption, setOrderingOption] = useState('order-priority');

  useEffect(() => {
    fetchData().then((data) => setTickets(data.tickets));
  }, []);

  const groupedTickets = groupTickets(tickets, groupingOption);
  const sortedGroupedTickets = sortTickets(groupedTickets, groupingOption, orderingOption);

  function groupTickets(tickets, option) {
    if (option === 'group-status') {
      const grouped = {};
      tickets.forEach((ticket) => {
        const status = ticket.status;
        if (!grouped[status]) {
          grouped[status] = [];
        }
        grouped[status].push(ticket);
      });
      return grouped;
    } else if (option === 'group-user') {
      const grouped = {};
      tickets.forEach((ticket) => {
        const user = ticket.userId;
        if (!grouped[user]) {
          grouped[user] = [];
        }
        grouped[user].push(ticket);
      });
      return grouped;
    } else if (option === 'group-priority') {
      const grouped = {};
      tickets.forEach((ticket) => {
        const priority = ticket.priority;
        if (!grouped[priority]) {
          grouped[priority] = [];
        }
        grouped[priority].push(ticket);
      });
      return grouped;
    }
    return {};
  }

  function sortTickets(groupedTickets, groupingOption, orderingOption) {
    const flattenAndSort = (tickets) => {
      if (orderingOption === 'order-priority') {
        return tickets.sort((a, b) => b.priority - a.priority);
      } else if (orderingOption === 'order-title') {
        return tickets.sort((a, b) => a.title.localeCompare(b.title));
      }
      return tickets;
    };

    if (groupingOption === 'group-status' || groupingOption === 'group-user') {
      const sortedGroupedTickets = {};
      Object.keys(groupedTickets).forEach((groupKey) => {
        sortedGroupedTickets[groupKey] = flattenAndSort(groupedTickets[groupKey]);
      });
      return sortedGroupedTickets;
    } else if (groupingOption === 'group-priority') {
      const flattenedTickets = flattenAndSort(Object.values(groupedTickets).flat());
      const sortedGroupedTickets = groupTickets(flattenedTickets, 'group-priority');
      return sortedGroupedTickets;
    }

    return groupedTickets;
  }

  return (
    <div className="board">
      <Filter setGroupingOption={setGroupingOption} setOrderingOption={setOrderingOption} />
      {Object.keys(sortedGroupedTickets).map((groupKey) => (
        <div key={groupKey} className="column">
          <div className="header">
            <h2>{groupingOption === 'group-priority' ? getPriorityLabel(groupKey) : groupKey}</h2>
            <div className="action-icons">
              <FaPlus className="add-icon" title="Add Ticket" />
              <FaEllipsisH className="ellipsis-icon" title="More Options" />
            </div>
          </div>
          {sortedGroupedTickets[groupKey].map((ticket) => (
            <Card key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
};

function getPriorityLabel(priority) {
  switch (parseInt(priority)) {
    case 4:
      return 'Urgent';
    case 3:
      return 'High';
    case 2:
      return 'Medium';
    case 1:
      return 'Low';
    case 0:
      return 'No priority';
    default:
      return '';
  }
}

export default Board;

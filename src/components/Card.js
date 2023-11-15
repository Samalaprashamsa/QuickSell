// Card.js
import React from 'react';
import './Card.css';
import { FaEllipsisH, FaUser } from 'react-icons/fa'; // Import the required icons

const Card = ({ ticket }) => {
  return (
    <div className="card">
      <div className="id">
        {ticket.id}
        <FaUser className="profile-icon" /> {/* Add profile photo icon */}
      </div>
      <div className="content">
        <h3>{ticket.title}</h3>
        <div className="icon-box">
          <FaEllipsisH className="ellipsis-icon" /> {/* Add horizontal ellipsis icon */}
          {ticket.tag && ticket.tag.length > 0 && (
            <div className="tag-box">
              <p className="tag">{`Tag: ${ticket.tag[0]}`}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;

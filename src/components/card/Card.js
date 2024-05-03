import React from "react";

const Card = ({ name, email, id, onEdit, onDelete }) => {
  return (
    <div className="Card">
      <div className="CardIconsArea">
        <i className="bi bi-pencil-fill" onClick={onEdit}></i>
        <i style={{marginLeft: '15px'}} className="bi bi-trash-fill" onClick={onDelete}></i>
      </div>
      <img style={{width: '300px', height: '300px'}} src={`https://www.robohash.org/${id}?200x200`} alt="Robots" />
      <div className="CardTextArea">
        <h2 style={{ fontSize: "2em" }}>{name}</h2>
        <p style={{ fontSize: "1em" }}>{email}</p>
      </div>
    </div>
  );
};

export default Card;

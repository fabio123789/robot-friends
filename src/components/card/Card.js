import React from "react";

const Card = ({ name, email, id }) => {
  return (
    <div className="Card">
      <img src={`https://www.robohash.org/${id}?200x200`} alt="Robots" />
      <div className="CardTextArea">
        <h2 style={{ fontSize: "2em" }}>{name}</h2>
        <p style={{ fontSize: "1em" }}>{email}</p>
      </div>
    </div>
  );
};

export default Card;

import Card from "../card/Card";
import React from "react";
const CardList = ({robots, onEdit, onDelete}) => {
  return (
    <div className="FlexCenter CardList">
      {robots.map((robot, key) => (
        <Card key={key} id={robot.id} name={robot.name} email={robot.email} onEdit={() => onEdit(key)} onDelete={() => onDelete(key)} />
      ))}
    </div>
  );
};

export default CardList;

import Card from "../card/Card";
import React from "react";
const CardList = ({robots}) => {
  return (
    <div className="FlexCenter CardList">
      {robots.map((robot, key) => (
        <Card key={key} id={robot.id} name={robot.name} email={robot.email} />
      ))}
    </div>
  );
};

export default CardList;

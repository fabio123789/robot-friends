import React, { useState } from "react";
import SearchBar from "../searchbar/SearchBar";

const Popup = ({ children }) => {
  return (
    <div className="PopupBackground">
      <div className="Popup">{children}</div>
    </div>
  );
};

export const DeletePopup = ({ robot, onDelete, onCancel }) => {
  return (
    <Popup>
      <h1 style={{ fontSize: "3em", color: "white", marginBottom: "20px" }}>
        Are you sure you want to delete your Robot Friend {robot.name}?
      </h1>
      <div>
        <button onClick={onCancel} className="Button">
          Cancel
        </button>
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => onDelete(robot.id)}
          className="Button Warning"
        >
          Yes
        </button>
      </div>
    </Popup>
  );
};

const ValidInput = (value = "", type) => {
  if (value.length < 1) {
    return "Need to be filled";
  } else if (type === "email") {
    if (
      !value.match(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/)
    ) {
      return "Invalid email";
    }
  }
  return false;
};

export const EditCreatePopup = ({ robot = {}, onChange, onCancel, isEdit }) => {
  const [name, setName] = useState(robot.name);
  const [email, setEmail] = useState(robot.email);
  let errorName = ValidInput(name);
  let errorEmail = ValidInput(email, "email");

  console.log(errorEmail, errorName);
  return (
    <Popup>
      <h1 style={{ fontSize: "3em", color: "white", marginBottom: "20px" }}>
        {isEdit ? "Edit your Robot Friend" : "Create your Robot Friend"}
      </h1>
      <SearchBar
        style={{ marginBottom: "20px" }}
        errorMessage={errorName}
        name="Name"
        value={name}
        searchChange={(event) => setName(event.target.value)}
      />
      <SearchBar
        style={{ marginBottom: "20px" }}
        errorMessage={errorEmail}
        name="Email"
        value={email}
        searchChange={(event) => setEmail(event.target.value)}
      />
      <div>
        <button
          onClick={() => onChange({ ...robot, name, email })}
          className={"Button" + (errorEmail || errorName ? " Disabled" : "")}
        >
          {isEdit ? "Edit" : "Create"}
        </button>
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => onCancel(robot.id)}
          className="Button"
        >
          Cancel
        </button>
      </div>
    </Popup>
  );
};

export default Popup;

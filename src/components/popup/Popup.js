import React from "react";

const Popup = ({ children }) => {
  return (
    <div className="PopupBackground">
      <div className="Popup">{children}</div>
    </div>
  );
};

export const DeletePopup = ({user, onDelete, onCancel}) => {
  return (
    <Popup>
      <h1 style={{fontSize: '3em', color: 'white', marginBottom: '20px'}}>Are you sure you want to delete your Robot Friend {user.name}?</h1>
      <button onClick={onCancel} className="Button">Cancel</button>
      <button style={{marginLeft: '10px'}} onClick={() =>onDelete(user.id)} className="Button Warning">Yes</button>
    </Popup>
  );
};

export const EditPopup = ({user, onDelete, onCancel}) => {
    return (
      <Popup>
        <h1 style={{fontSize: '3em', color: 'white', marginBottom: '20px'}}>Are you sure you want to delete your Robot Friend {user.name}?</h1>
        <button onClick={onCancel} className="Button">Cancel</button>
        <button style={{marginLeft: '10px'}} onClick={() =>onDelete(user.id)} className="Button Warning">Yes</button>
      </Popup>
    );
  };
  

export default Popup;

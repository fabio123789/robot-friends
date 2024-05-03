import React, { useEffect, useState } from "react";
import "./App.css";
import CardList from "./components/cardList/CardList";
import SearchBar from "./components/searchbar/SearchBar";
import Scroll from "./components/scroll/Scroll";
import ErrorBoundry from "./components/errorBoundry/ErrorBoundry";
import { DeletePopup, EditCreatePopup } from "./components/popup/Popup";

async function HandleDelete(id, robots) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/" + id,
    {
      method: "DELETE",
    }
  );

  if (response.status === 200) {
    const foundId = robots.findIndex((robot) => robot.id === id);
    robots.splice(foundId, 1);
  }

  return robots;
}

async function HandleChange(robot, robots, isEdit) {
  if (isEdit) {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/" + robot.id,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(robot),
      }
    );

    if (response.status === 200) {
      const foundId = robots.findIndex(
        (tempRobot) => tempRobot.id === robot.id
      );
      robots.splice(foundId, 1, robot);
    }
  } else {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(robot),
      }
    );

    if (response.status === 201) {
      const data = await response.json();
      robots.push(data);
    }
  }

  return robots;
}

function App() {
  const [robots, setRobots] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [edit, setEdit] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [confirmDelete, setDelete] = useState(false);
  const [selectedRobot, setSelectedRobot] = useState({});

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setRobots(users));
  }, []);

  const filteredRobots = robots.filter((robots) => {
    return robots.name.toLowerCase().includes(searchField.toLowerCase());
  });
  return !robots.length ? (
    <div className="FlexCenter">
      <h1 style={{ color: "white" }}>Loading</h1>
    </div>
  ) : (
    <div className="FlexCenter">
      <h1 className="Title">Robot Friends</h1>
      <div className="InputsArea" style={{ marginBottom: "30px" }}>
        <SearchBar
          value={searchField}
          searchChange={(event) => setSearchField(event.target.value)}
        />
        <button style={{marginLeft: '10px'}} className="Button" onClick={() => setOpenPopup(true)}>
          Create A New Robot Friend
        </button>
      </div>
      <Scroll>
        {!filteredRobots.length ? (
          <h1 style={{ color: "white", textAlign: "center" }}>
            No Robots Friend with that name
          </h1>
        ) : (
          <ErrorBoundry>
            <CardList
              robots={filteredRobots}
              onEdit={(cardId) => {
                setSelectedRobot(robots[cardId]);
                setEdit(true);
                setOpenPopup(true);
              }}
              onDelete={(cardId) => {
                setSelectedRobot(robots[cardId]);
                setDelete(true);
              }}
            />
          </ErrorBoundry>
        )}
      </Scroll>
      {openPopup ? (
        <EditCreatePopup
          isEdit={edit}
          robot={selectedRobot}
          onChange={(data) =>
            HandleChange(data, robots, edit).then((updatedRobots) => {
              setRobots(updatedRobots);
              setSelectedRobot({});
              setEdit(false);
              setOpenPopup(false);
            })
          }
          onCancel={() => {
            setEdit(false);
            setSelectedRobot({});
            setOpenPopup(false);
          }}
        ></EditCreatePopup>
      ) : confirmDelete ? (
        <DeletePopup
          robot={selectedRobot}
          onDelete={(id) =>
            HandleDelete(id, robots).then((data) => {
              setRobots(data);
              setSelectedRobot({});
              setDelete(false);
            })
          }
          onCancel={() => {
            setDelete(false);
            setSelectedRobot({});
          }}
        ></DeletePopup>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;

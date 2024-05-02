import React, { useEffect, useState } from "react";
import "./App.css";
import CardList from "./components/cardList/CardList";
import SearchBar from "./components/searchbar/SearchBar";
import Scroll from "./components/scroll/Scroll";
import ErrorBoundry from "./components/errorBoundry/ErrorBoundry";
import { DeletePopup, EditPopup } from "./components/popup/Popup";

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

async function HandleEdit(robot, robots) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/" + robot.id,
    {
      method: "PUT",
    }
  );

  if (response.status === 200) {
    const foundId = robots.findIndex((tempRobot) => tempRobot.id === robot.id);
    robots.splice(foundId, 1, robot);
  }

  return robots;
}

function App() {
  const [robots, setRobots] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [edit, setEdit] = useState(false);
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
    <h1>Loading</h1>
  ) : (
    <div className="FlexCenter">
      <h1 className="Title">Robot Friends</h1>
      <SearchBar
        value={searchField}
        searchChange={(event) => setSearchField(event.target.value)}
      />
      <Scroll>
        {!filteredRobots.length ? (
          <h1 style={{ color: "white", textAlign: "center" }}>
            No Robots Friend with that name
          </h1>
        ) : (
          <ErrorBoundry>
            <CardList
              robots={filteredRobots}
              onEdit={(cardId) => console.log(cardId)}
              onDelete={(cardId) => {
                setSelectedRobot(robots[cardId]);
                setDelete(true);
              }}
            />
          </ErrorBoundry>
        )}
      </Scroll>
      {edit ? (
        <EditPopup
          robot={selectedRobot}
          onDelete={(data) =>
            HandleEdit(data, robots).then((updatedRobots) => {
              setRobots(updatedRobots);
              setSelectedRobot({});
              setEdit(false);
            })
          }
        ></EditPopup>
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
          onCancel={() => setDelete(false)}
        ></DeletePopup>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;

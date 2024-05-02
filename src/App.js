import React, { useEffect, useState } from "react";
import "./App.css";
import CardList from "./components/cardList/CardList";
import SearchBar from "./components/searchbar/SearchBar";
import Scroll from "./components/scroll/Scroll";
import ErrorBoundry from "./components/errorBoundry/ErrorBoundry";

function App() {
  const [robots, setRobots] = useState([]);
  const [searchField, setSearchField] = useState("");

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
            <CardList robots={filteredRobots} />
          </ErrorBoundry>
        )}
      </Scroll>
    </div>
  );
}

export default App;

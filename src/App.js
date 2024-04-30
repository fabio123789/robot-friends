import React from "react";
import "./App.css";
import CardList from "./components/cardList/CardList";
import SearchBar from "./components/searchbar/SearchBar";
import Scroll from "./components/scroll/Scroll";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ robots: users }));
  }

  render() {
    let { robots, searchField } = this.state;
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
          searchChange={(event) => {
            this.setState({ searchField: event.target.value });
          }}
        />
        <Scroll>
          {!filteredRobots.length ? (
            <h1>No Robots Friend with that name</h1>
          ) : (
            <CardList robots={filteredRobots} />
          )}
        </Scroll>
      </div>
    );
  }
}

export default App;

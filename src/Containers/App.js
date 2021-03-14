import React, { Component } from 'react'
import './App.css';
import CardList from "../Components/CardList"
import SearchBox from "../Components/SearchBox"
import Scroll from "../Components/Scroll"

class App extends Component {
  constructor() {
    super()
    this.state = {
      search: '',
      robots: []
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => { this.setState({ robots: users }) })
  }

  //use arrow function if error of unefined occurs
  onSearchChange = (event) => {
    this.setState({ search: event.target.value })
  }

  render() {
    const { robots, search } = this.state;

    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(search.toLowerCase());
    })

    return (
      !robots.length ?
        <h1>Loading...</h1> :
        (
          <div className="tc">
            <h1 className="f1">Robo-App</h1>
            <SearchBox searchChange={this.onSearchChange} />
            <Scroll>
              <CardList robots={filteredRobots} />
            </Scroll>

          </div>
        )
    )
  }
}

export default App;

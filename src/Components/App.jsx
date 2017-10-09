import React, { Component } from "react";

import developers from "../../developers.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      developers: [],
      search: ""
    };
  }

  searchDeveloper(event) {
    let updatedList = developers;
    updatedList = updatedList.filter(item => {
      // TODO: A better comparison condition
      return (
        item.name.toLowerCase().search(event.target.value.toLowerCase()) !==
          -1 ||
        item.company.toLowerCase().search(event.target.value.toLowerCase()) !==
          -1 ||
        item.github.toLowerCase().search(event.target.value.toLowerCase()) !==
          -1 ||
        item.city.toLowerCase().search(event.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({ developers: updatedList });
  }

  componentWillMount() {
    this.setState({
      developers
    });
  }

  render() {
    return (
      <div>
        <h1>Awesome Developers</h1>
        <input
          type="text"
          placeholder="Search"
          onChange={this.searchDeveloper.bind(this)}
        />
        <div>
          <p>A curated list of awesome developers.</p>
          <ul>
            {this.state.developers.map((developer, index) => (
              <li key={index}>
                <div>{developer.name}</div>
                <div>{developer.technologies.join(", ")}</div>
                <div>{developer.company}</div>
                <div>{developer.city}</div>
                <div>{developer.github}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";

import developers from "../developers.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      developers: [],
      search: {
        name: "",
        technology: "",
        company: "",
        city: ""
      }
    };
  }

  filterByName(event) {
    let updatedList = developers;
    updatedList = updatedList.filter(
      item =>
        item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1
    );
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
          placeholder="Name"
          onChange={this.filterByName.bind(this)}
        />
        <input type="text" placeholder="Technology" />
        <input type="text" placeholder="Company" />
        <input type="text" placeholder="City" />

        <div>
          <p>A curated list of awesome developers.</p>
          <ul>
            {this.state.developers.map((developer, index) => (
              <li key={index}>
                <div>{developer.name}</div>
                <div>{developer.technologies.join(", ")}</div>
                <div>{developer.company}</div>
                <div>{developer.city}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;

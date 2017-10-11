import React, { Component } from "react";

let developers = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      developers: [],
      search: ""
    };
  }

  componentDidMount() {
    let userName = "shreyas-a";
    if (location.host && location.host.indexOf(".github.io") !== -1) {
      userName = location.host.split(".github.io")[0];
    }

    fetch(
      `https://api.github.com/repos/${userName}/awesome-developers/contents/developers.json`
    )
      .then(response => response.json())
      .then(jsonResponse => atob(jsonResponse.content))
      .then(contentResponse => JSON.parse(contentResponse))
      .then(developersResponse => {
        developers = developersResponse;
        this.setState({
          developers
        });
      });
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
        item.city.toLowerCase().search(event.target.value.toLowerCase()) !==
          -1 ||
        item.skills.find(s => s.includes(event.target.value.toLowerCase()))
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
          <div className="developer-list">
            {this.state.developers.map((developer, index) => (
              <div className="developer" key={index}>
                <img
                  src={`https://avatars.githubusercontent.com/${developer.github}`}
                  className="profile-image"
                  alt="Profile Image"
                />
                <div>{developer.name}</div>
                <div>{developer.skills.join(", ")}</div>
                <div>{developer.company}</div>
                <div>{developer.city}</div>
                <div>{developer.github}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

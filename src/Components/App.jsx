import React, { Component } from "react";

let developers = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      developers: []
    };

    this.searchDeveloper = this.searchDeveloper.bind(this);
  }

  componentDidMount() {
    fetch(
      `https://api.github.com/repos/shreyas-a/awesome-developers/contents/developers.json`
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
    updatedList = updatedList.filter(
      item =>
        // TODO: A better comparison condition
        item.name.toLowerCase().search(event.target.value.toLowerCase()) !==
          -1 ||
        item.company.toLowerCase().search(event.target.value.toLowerCase()) !==
          -1 ||
        item.city.toLowerCase().search(event.target.value.toLowerCase()) !==
          -1 ||
        item.github.toLowerCase().search(event.target.value.toLowerCase()) !==
          -1 ||
        item.email.toLowerCase().search(event.target.value.toLowerCase()) !==
          -1 ||
        item.skills.find(s => s.includes(event.target.value.toLowerCase()))
    );
    this.setState({ developers: updatedList });
  }

  render() {
    return (
      <div>
        <h1>Awesome Developers</h1>
        <input
          type="text"
          placeholder="Search"
          onChange={this.searchDeveloper}
        />
        <div>
          <p>A curated list of awesome developers.</p>
          <div className="developer-list">
            {this.state.developers.map((developer, index) => (
              <div className="developer" key={index}>
                <img
                  src={`https://avatars.githubusercontent.com/${developer.github}`}
                  className="profile-image"
                  alt="profile"
                />
                <div>{developer.name}</div>
                <div>{developer.skills.join(", ")}</div>
                <div>{developer.company}</div>
                <div>{developer.city}</div>
                <div>{developer.github}</div>
                <div>{developer.email}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

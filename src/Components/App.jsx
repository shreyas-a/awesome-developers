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
        <br />
        <div className="hd1">
          Awesome Developers
          <br />
          <small>Curated list of awesome dev's Around the World</small>
        </div>

        <div className="search-div">
          <input
            type="text"
            placeholder="Search"
            onChange={this.searchDeveloper.bind(this)}
            className="search"
          />
        </div>

        <div>
          <div className="developer-list">
            {this.state.developers.map((developer, index) => (
              <div className="developer" key={index}>
                <div className="dev">
                  <div className="dev-avatar">
                    <img
                      src={`https://avatars.githubusercontent.com/${developer.github}`}
                      className="profile-image"
                      alt="Profile Image"
                    />
                  </div>
                  <div className="dev-desc">
                    <div className="dev--name">{developer.name}</div>
                    <div className="dev--company">{developer.company}</div>
                    <div className="dev--city">{developer.city}</div>
                    <div className="dev--email">{developer.email}</div>
                  </div>
                  <div className="dev--social">
                    <a href={'https://github.com/'+developer.github} target="_blank">
                      <img src="/img/git.svg" alt="git"/>
                    </a>                      
                  </div>
                </div>
                <div className="dev--skills">
                  {developer.skills.map((skill, index) => (
                    <span key={index}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }
}

export default App;

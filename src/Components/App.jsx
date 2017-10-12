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
        item.skills.find(s => s.toLowerCase().includes(event.target.value.toLowerCase()))
    );
    this.setState({ developers: updatedList });
  }

  render() {
    return (
      <div>
        <br />
        <div className="hd1"> Awesome Developers </div>
        <div className="hd-small">Curated list of awesome developers around the world</div>

        <div className="search-div">
          <input
            type="text"
            placeholder="Search"
            onChange={this.searchDeveloper}
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
                      alt="Profile"
                    />
                  </div>
                  <div className="dev-desc">
                    <div className="dev--name">{developer.name}</div>
                    <div className="dev--company">{developer.company}</div>
                    <div className="dev--city">{developer.city}</div>
                    <div className="dev--email">{developer.email}</div>
                  </div>
                  <div className="dev--social">
                    <a href={`https://github.com/${developer.github}`} target="_blank">
                      <svg aria-hidden="true" className="octicon octicon-mark-github" height="25" version="1.1" viewBox="0 0 16 16" width="32">
                        <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="dev--skills">
                  {developer.skills.map((skill, sIndex) => (
                    <span key={sIndex}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="footer">
          Crafted with <span className="heart">♥</span> in Bangalore, India
        </div>

      </div>
    );
  }
}

export default App;

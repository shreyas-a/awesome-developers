import React, { Component } from "react";

let developers = [];
const shuffle = (a) => {
  const arr = a;
  for (let i = a.length; i; i -= 1) {
    const j = Math.floor(Math.random() * i);
    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
  }

  return arr;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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
        const shuffledDevelopers = shuffle(developersResponse);
        developers = shuffledDevelopers;
        this.setState({
          isLoading: false,
          developers: shuffledDevelopers
        });
      });
  }

  filterIt = (arr, searchKey) => {
    return arr.filter(obj => Object.keys(obj).some((key) =>
      (
        (key + "" !== 'company')) ? ((obj[key] + "").toLowerCase()).includes(searchKey.toLowerCase()) : null
    ));
  }

  searchDeveloper(event) {
    const updatedList = developers;
    const result = this.filterIt(updatedList, event.target.value.toString());
    this.setState({ developers: result });
  }

  render() {
    return (
      <div>
        <a target="_blank" href="https://github.com/shreyas-a/awesome-developers" className="github-corner" aria-label="View source on Github">
          <svg width="80" height="80" viewBox="0 0 250 250" aria-hidden="true">
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
            <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
              fill="currentColor" className="octo-arm"></path>
            <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
              fill="currentColor" className="octo-body"></path>
          </svg>
        </a>
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
          {this.state.isLoading ?
            <div className="center">
              <img src="loader.gif" className="loader" alt="loader" />
            </div> :
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
                      <div className="dev--email"><a href={`mailto:${developer.email}`} target="_top">{developer.email}</a></div>
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
            </div>}
        </div>

        <div className="footer">
          Crafted with <span className="heart">♥</span> in Bangalore, India
        </div>

      </div>
    );
  }
}

export default App;

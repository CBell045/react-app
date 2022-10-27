import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: [],
    dl: '',
    en: '',
    hy: '',
    ru: '',
    sp: '',
  };


  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.translation }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch("/translate");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    // const body = await response.text();
    const body = await response.json();
    console.log(body)
    this.setState({ responseToPost: body });
    this.setState({ dl: body[0].detectedLanguage.language });
    this.setState({ en: body[0].translations[0].text });
    this.setState({ hy: body[0].translations[1].text });
    this.setState({ ru: body[0].translations[2].text });
    this.setState({ sp: body[0].translations[3].text });
  };


render() {
    return (
      <div className="App">
        {/* <p>{this.state.response}</p> */}
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Input Text:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        {/* <p>{this.state.responseToPost}</p> */}
            <div>
            <label for="dl">Detected Language:</label>
                <span id="dl"> {this.state.dl}</span>
            </div>
            <span>
                <label for="english">English:</label>
                <span id="english"> {this.state.en}</span>
            </span>
            <span>
                <label for="armenian">Armenian: </label>
                <span id="armenian"> {this.state.hy}</span>
            </span>
            <span>
                <label for="russian">Russian: </label>
                <span id="russian"> {this.state.ru}</span>
            </span>
            <span>
                <label for="spanish">Spanish: </label>
                <span id="spanish"> {this.state.sp}</span>
            </span>
      </div>
    );
  }
}




export default App; 
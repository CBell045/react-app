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

  handleReset = () => {
    this.setState({post: ''})
  };


render() {
    return (
      <div className="App">
        <form id="input_box">
          <p>
            <strong>Input Text:</strong>
          </p>
          <input
            id="input"
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <div>
            <button onClick={this.handleSubmit} type="submit">Submit</button>
            <button onClick={this.handleReset} type="reset">Reset</button>
          </div>
          
        </form>
        <div class="container">
          <div class="cell">English: {this.state.en}</div>
          <div class="cell">Հայերեն: {this.state.hy}</div>
          <div class="cell">Русский: {this.state.ru}</div>
          <div class="cell">Español: {this.state.sp}</div>
        </div>
    </div>
    );
  }
}




export default App; 
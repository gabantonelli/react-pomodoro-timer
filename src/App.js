import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    breakLength: 5,
    sessionLength: 25
  }

  changeLength(subject, type) {
    const updateValue = (sign, value) => {
      if (sign === 'dec' && value > 0) {
        value--;
      } else if (sign === 'inc' && value < 60) {
        value++;
      }
      return value;
    }

    if (subject === 'break') {
      const val = this.state.breakLength;
      this.setState({ breakLength: updateValue(type, val) });
    } else if (subject === 'session') {
      const val = this.state.sessionLength;
      this.setState({ sessionLength: updateValue(type, val) });
    }
  }

  render() {
    return (
      <div className="App">
        <h1 id="main-title">Pomodoro Clock</h1>
        <div id="break-label">Break Length</div>
        <div id="break-length">{this.state.breakLength}</div>
        <img src="./img/Reduce Button.png" alt="Decrement Break Length" onClick={() => this.changeLength('break', 'dec')} />
        <img src="./img/Increase Button.png" alt="Increase Break Length" onClick={() => this.changeLength('break', 'inc')} />
        <div id="session-label">Session Length</div>
        <div id="session-length">{this.state.sessionLength}</div>
        <img src="./img/Reduce Button.png" alt="Decrement Session Length" onClick={() => this.changeLength('session', 'dec')} />
        <img src="./img/Increase Button.png" alt="Increase Sessopm Length" onClick={() => this.changeLength('session', 'inc')} />
      </div>
    );
  }
}

export default App;

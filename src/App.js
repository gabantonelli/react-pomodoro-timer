import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    breakLength: 5,
    sessionLength: 25,
    status: 'Session',
    minutesLeft: 25,
    secondsLeft: 0,
    running: false,
  }

  changeLength(subject, type) {
    const updateValue = (sign, value) => {
      if (sign === 'dec' && value > 1) {
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
      let val = this.state.sessionLength;
      val = updateValue(type, val);
      this.setState({ sessionLength: val, minutesLeft: val, secondsLeft: 0 });
    }
  }

  toggleTimer() {
    //get current values
    if (!this.state.running) {
      this.setState({ running: true });
      let minutes = this.state.minutesLeft;
      let seconds = this.state.secondsLeft;
      if (seconds === 0) {
        seconds = 60;
        minutes--;
      }
      const updateTimer = () => {
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        this.setState({ minutesLeft: minutes, secondsLeft: seconds })
      };
      this.setState({ timer: setInterval(updateTimer, 1000) });
    } else {
      clearInterval(this.state.timer);
      this.setState({ running: false });
    }
  }

  resetTimer() {
    if (this.state.running) this.toggleTimer();
    const timeToReset = this.state.sessionLength;
    this.setState({ minutesLeft: timeToReset, secondsLeft: 0 });
  }

  render() {
    return (
      <div className="App">
        <h1 id="main-title">Pomodoro Clock</h1>
        <div className="length-comand">
          <span className="length-label" id="break-label">Break Length</span>
          <span className="length-tag" id="break-length">{this.state.breakLength}</span>
          <img className="arrow-button" src="./img/Reduce Button.png" alt="Decrement Break Length" onClick={() => this.changeLength('break', 'dec')} />
          <img className="arrow-button" src="./img/Increase Button.png" alt="Increase Break Length" onClick={() => this.changeLength('break', 'inc')} />
        </div>
        <div className="length-comand">
          <span className="length-label" id="session-label">Session Length</span>
          <span className="length-tag" id="session-length">{this.state.sessionLength}</span>
          <img className="arrow-button" src="./img/Reduce Button.png" alt="Decrement Session Length" onClick={() => this.changeLength('session', 'dec')} />
          <img className="arrow-button" src="./img/Increase Button.png" alt="Increase Sessopm Length" onClick={() => this.changeLength('session', 'inc')} />
        </div>
        <div className="timer-display">
          <div id="timer-label">{this.state.status}</div>
          <div id="time-left">{this.state.minutesLeft}:{((this.state.secondsLeft < 10) ? '0' : null) + this.state.secondsLeft}</div>
          <div className="comands">
            <img id="start_stop" src="./img/Play Button.png" alt="Start or Stop the timer" onClick={this.toggleTimer.bind(this)} />
            <img id="reset" src="./img/Reset Button.png" alt="Reset the timer" onClick={this.resetTimer.bind(this)} />
          </div>
        </div>

      </div>
    );
  }
}

export default App;

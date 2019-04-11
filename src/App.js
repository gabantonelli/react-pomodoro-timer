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
      const val = this.state.sessionLength;
      this.setState({ sessionLength: updateValue(type, val) });
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
        <div id="timer-label">{this.state.status}</div>
        <div id="time-left">{this.state.minutesLeft}:{this.state.secondsLeft}</div>
        <img id="start_stop" src="./img/Play Button.png" alt="Start or Stop the timer" onClick={this.toggleTimer.bind(this)} />
        <img id="reset" src="./img/Reset Button.png" alt="Start or Stop the timer" />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    breakLength: 5,
    sessionLength: 25,
    status: 'Session',
    minutesLeft: 25,
    secondsLeft: 0,
    running: false
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
      if (this.state.running) this.toggleTimer();
      this.setState({ sessionLength: val, minutesLeft: val, secondsLeft: 0 });
    }
  }

  toggleTimer() {
    //get current values
    if (!this.state.running) {
      this.setState({ running: true });
      let minutes = this.state.minutesLeft;
      let seconds = this.state.secondsLeft;
      //check if counter is finished
      if (seconds === 0) {
        seconds = 60;
        minutes--;
      }
      const updateTimer = () => {
        if (minutes === 0 && seconds === 0) {
          document.getElementById('beep').play();
          if (this.state.status === 'Session') {
            minutes = this.state.breakLength;
            this.setState({ status: 'Break' });
          } else {
            minutes = this.state.sessionLength;
            this.setState({ status: 'Session' });
          }
          seconds = 0;
        }
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
    this.setState({ minutesLeft: 25, secondsLeft: 0, sessionLength: 25, breakLength: 5 });
  }


  render() {
    return (
      <div className="App">
        <aside>&nbsp;</aside>
        <main>
          <h1 id="main-title">Pomodoro Clock</h1>
          <p class="author">by <a href="https://www.github.com/gabantonelli">Gabriel Antonelli</a></p>
          <div className="length-comand">
            <span className="length-label" id="break-label">Break Length</span>
            <span className="length-tag" id="break-length">{this.state.breakLength}</span>
            <img className="arrow-button" src="./img/Reduce button.png" alt="Decrement Break Length" onClick={() => this.changeLength('break', 'dec')} />
            <img className="arrow-button" src="./img/Increase Button.png" alt="Increase Break Length" onClick={() => this.changeLength('break', 'inc')} />
          </div>
          <div className="length-comand">
            <span className="length-label" id="session-label">Session Length</span>
            <span className="length-tag" id="session-length">{this.state.sessionLength}</span>
            <img className="arrow-button" src="./img/Reduce button.png" alt="Decrement Session Length" onClick={() => this.changeLength('session', 'dec')} />
            <img className="arrow-button" src="./img/Increase Button.png" alt="Increase Session Length" onClick={() => this.changeLength('session', 'inc')} />
          </div>
          <div className="timer-display">
            <div id="timer-label">{this.state.status}</div>
            <div id="time-left">{this.state.minutesLeft}:{((this.state.secondsLeft < 10) ? '0' : null) + this.state.secondsLeft}</div>
          </div>
          <div className="comands">
            <img id="start_stop" src="./img/Play button.png" alt="Start or Stop the timer" onClick={this.toggleTimer.bind(this)} />
            <img id="reset" src="./img/Reset Button.png" alt="Reset the timer" onClick={this.resetTimer.bind(this)} />
          </div>
          <img className="pomodoro-img" src="./img/Tomato.png" alt="Pomodoro"></img>
          <audio id="beep" >
            <source src="./bell.mp3" type="audio/mpeg" />
            Your browser does not support the audio tag.
      </audio>
        </main>
      </div>
    );
  }
}

export default App;

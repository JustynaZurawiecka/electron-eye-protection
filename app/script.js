import React from 'react';
import { render } from 'react-dom';

class AppDescription extends React.Component {
  render() {
      return (
          <div>
              <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
              <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      )
  }
}

class App extends React.Component {
  state = {
    status: 'off',
    time: 0,
    timer: null,
  }

  formatTime = (time) => { 
    let min = Math.floor(time/60);
    let sec = time%60;

    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    return `${min}:${sec}`
  };

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  step = () => {
    this.setState({
      time:this.state.time-1,
    })

    if(this.state.time === 0) {
      if(this.state.status === 'work') {
        this.setState({
          status: 'rest',
          time: 20,
        })
        this.playBell();
      } else if (this.state.status === 'rest') {
        this.setState({
          status: 'work',
          time: 1200,
        })
        this.playBell();
      }
    }
  };

  startTimer = () => {
    this.setState({
      timer: setInterval(this.step, 1000),
      time: 1200,
      status: 'work'
    });
    this.playBell();
  };

  stopTimer = () => {
    this.setState({
      time: 0,
      status: 'off'
    });
    clearInterval(this.state.timer);
    this.playBell();
  };

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  closeApp = () => {
    window.close();
  }

  render() {
    const { status } = this.state;

    return (
      <div>
        <div>
          <h1>Protect your eyes</h1>
          {(status === 'off') && <AppDescription />}
          {(status === 'work') && <img src="./images/Work.png" />}
          {(status === 'rest') && <img src="./images/Rest.png" />}
          {(status !== 'off') && <div className="timer">{this.formatTime(this.state.time)}</div>}
          {(status === 'off') && <button className="btn" onClick={this.startTimer}>Start</button>}
          {(status !== 'off') && <button className="btn" onClick={this. stopTimer}>Stop</button>}
          <button className="btn btn-close" onClick={this.closeApp}>X</button>
        </div>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));

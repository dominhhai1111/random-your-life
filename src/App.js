import React from 'react';

import logoDo from './do.png';
import logoDont from './dont.png';
import './App.css';
import './scss/app.scss'

const VALUE_NONE = 0;
const VALUE_DO = 1;
const VALUE_DONT = 2;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: VALUE_NONE,
      count: 0,
    };
  }

  randomChoices = () => {
    let selected = Math.round(Math.random()) ? VALUE_DO : VALUE_DONT;
    this.setState({ selected: selected});
  }

  animateChoices = async () => {
      await this.setState({ selected: VALUE_DO });
      this.timer = setInterval(
        () => { this.reverseChoice() },
        200
      );
  }

  reverseChoice = () => {
    if (this.state.count >= 5) {
      clearInterval(this.timer);
      this.setState({ count: 0 });
      this.randomChoices();

      return;
    }

    this.setState({ selected: this.state.selected == VALUE_DO ? VALUE_DONT : VALUE_DO });
    this.state.count++;
  }

  render() {
    return (
      <div>
        <div className="content d-flex justify-content-center mb-3">
          <div className="image-area mr-2">
            <img id="do" className={"image " + (this.state.selected == VALUE_DO ? 'selected' : '')} src={logoDo} />
          </div>
          <div className="image-area ml-2">
            <img id="dont" className={"image " + (this.state.selected == VALUE_DONT ? 'selected' : '')}  src={logoDont} />
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-warning font-weight-bold" onClick={ this.animateChoices }>Get</button>
        </div>
      </div>
    );
  }
}

export default App;

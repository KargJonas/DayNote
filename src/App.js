import { Component } from 'react';
import dayjs from 'dayjs';
import TextareaAutosize from 'react-textarea-autosize';
import './App.scss';

import sun from './assets/sun.svg';

class Entry {
  constructor(date = dayjs().format('DD MM YY')) {
    this.date = date;
    this.text = 'Lorem Ipsum';
  }
}

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      entries: [new Entry(), new Entry(), new Entry()]
    };
  }

  handleKeyUp(event, index) {
    
  }

  getEntries() {
    const elements = [];
    const first = this.state.entries.length - 1;

    for (let i = first; i >= 0; i--) {
      const { date, text } = this.state.entries[i];
      // const separator = i != first ? <div className="separator" /> : null;

      elements.push(
        <li key={i}>
          <span className="date-tag">{date}</span>
          <TextareaAutosize
            className="text-box"
            spellCheck="false"
            defaultValue={text}
            onKeyUp={(event) => this.handleKeyUp(event, i)}
            // ref={(tag) => (this.textarea = tag)}
          />
          <div className="separator" />
        </li>
      );
    }

    return elements;
  }

  render() {
    const entries = this.getEntries();

    return (
      <div className="App">
        <img id="dark-mode-indicator" src={sun} />
        <div id="main">
          {entries}
        </div>
      </div>
    );
  }
}
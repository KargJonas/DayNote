import { Component } from 'react';
import dayjs from 'dayjs';
import './App.scss';

class Entry {
  constructor() {
    this.date = dayjs().format('DD MM YY');
    this.text = 'Lorem Ipsum';
  }
}

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      entries: [new Entry()]
    };
  }

  getEntries() {
    const elements = [];

    for (const { date, text } of this.state.entries) {
      elements.push(
        <li key={date}>
          <div className="date-tag">{date}</div>
          <textarea spellCheck="false" defaultValue={text} />
        </li>
      );
    }

    return elements;
  }

  render() {
    const entries = this.getEntries();

    return (
      <div className="App">
        <div id="main">
          {entries}
        </div>
      </div>
    );
  }
}
import { Component } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

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
      lightMode: false,
      entries: [new Entry(), new Entry(), new Entry()]
    };

    this.textareaReferences = [];
  }

  handleKeyDown(event, index) {
    const { key } = event;

    // Return as quickly as possible to reduce load while typing
    if (key !== "ArrowUp" && key !== "ArrowDown") return;
    const current = this.textareaReferences[index];
    const currentLineCount = current.value.split("\n").length;
    const cursorLine = current.value.substr(0, current.selectionStart).split("\n").length;

    if (key === "ArrowDown") {
      if (cursorLine !== currentLineCount) return;
      if (index === 0) return;
      const next = this.textareaReferences[index - 1];
      next.focus();
      next.setSelectionRange(0, 0); // !! Does not select for some reason
      event.preventDefault();
    }

    if (key === "ArrowUp") {
      if (cursorLine !== 1) return;
      if (index === this.state.entries.length - 1) return;
      const next = this.textareaReferences[index + 1];
      next.focus();
      next.setSelectionRange(next.value.length, next.value.length);
      event.preventDefault();

    }
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
            onKeyDown={(event) => this.handleKeyDown(event, i)}
            ref={(tag) => (this.textareaReferences[i] = tag)}
          />
          <div className="separator" />
        </li>
      );
    }

    return elements;
  }

  toggleLightMode() {
    this.setState({ lightMode: !this.state.lightMode });
  }

  render() {
    const entryElements = this.getEntries();
    const classes = classNames('App', { 'light-mode': this.state.lightMode });

    return (
      <div className={classes}>
        <div id="header-cover" />
        <h1 id="header">DayNote</h1>
        <img id="dark-mode-indicator" src={sun} onClick={this.toggleLightMode.bind(this)} />
        <div id="main">
          {entryElements}
        </div>
      </div>
    );
  }
}
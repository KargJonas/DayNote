import { Component } from 'react';

import './Terminal.scss';
import magnifyingGlass from '../assets/magnifying-glass.svg';
import classNames from 'classnames';

export default class Terminal extends Component {
  constructor() {
    super();

    this.state = {
      highlightedOption: 0
    };

    this.inputRef = undefined;
    this.keyEvent = this.keyPressed.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keyEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyEvent);
  }

  keyPressed({ key }) {
    this.inputRef.focus();
    const max = this.props.options.length;

    switch (key) {
      case 'ArrowUp':
        this.setState({highlightedOption: Math.abs(((this.state.highlightedOption - 1) % max))});
        break;

      case 'ArrowDown':
        this.setState({highlightedOption: (this.state.highlightedOption + 1) % max});
        break;

      case 'Enter':
        this.props.options[this.state.highlightedOption][1]();
        this.props.close();
        break;
    }
  }

  getOptions() {
    return this.props.options.map(([name, callback], index) => {
      const classes = classNames('option',
        { highlighted: index === this.state.highlightedOption });

      return <div
        key={index}
        className={classes}
        onClick={callback}>
        {name}
      </div>
    });
  }

  render() {
    const options = this.getOptions();

    return (
      <div className='terminal'>
        <div className='input-container'>
          <div className='search'>
            <img src={magnifyingGlass} />

            <input
              className='input'
              type='text'
              autoComplete='false'
              spellCheck='false'
              placeholder='Type to search'
              ref={(ref) => (this.inputRef = ref)}
            />
          </div>

          <div className='options'>
            {options}
          </div>
        </div>
      </div>
    );
  }
}
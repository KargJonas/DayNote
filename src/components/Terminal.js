import { Component } from 'react';

import './Terminal.scss';
import magnifyingGlass from '../assets/magnifying-glass.svg';

export default class Terminal extends Component {
  constructor() {
    super();

    this.inputRef = undefined;
    this.keyEvent = this.focus.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keyEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyEvent);
  }

  focus() {
    this.inputRef.focus();
  }

  getOptions() {
    return this.props.options.map(([name, callback], index) => {
      return <div key={index} className='option' onClick={callback}>{name}</div>
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
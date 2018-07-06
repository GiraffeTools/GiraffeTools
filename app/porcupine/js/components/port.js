import PropTypes from 'prop-types';
import React from 'react';


class Port extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

      let portElement = '';
      if (port.input) {
        portElement = <span  className='node__port--input' id={port.inputPort}/>
      } else if (port.output) {
        portElement = <span onClick={(event) => this.connectPort(event, index)} className='node__port--output' id={port.outputPort}/>
      }

      return (
        <li key={index}>
          <div className='node__port'>
            {port.name}
            {portElement}
          </div>
        </li>
      )
  }
}


export default Port;

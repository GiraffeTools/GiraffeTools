import PropTypes from 'prop-types';
// import React from 'react';
import PureComponent from 'react-pure-render/component';


class Port extends PureComponent {

  render() {
      const props = this.props;
      const {
        input,
        output
      } = this.props;

      let portElement = '';
      if (input) {
        portElement = <span  className='node__port--input' id={port.inputPort}/>
      } else if (output) {
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

import PropTypes from 'prop-types';
import React from 'react';
// import PureComponent from 'react-pure-render/component';


class Port extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      name,
      input,
      output,
    } = this.props;

    let portElement = '';
    if (input) {
      portElement = <span  className='node__port--input'/>
    } else if (output) {
      portElement = <span onClick={(event) => this.connectPort(event)} className='node__port--output'/>
    }

    return (
      <li>
        <div className='node__port'>
          {name}
          {portElement}
        </div>
      </li>
    )
  }
}


export default Port;

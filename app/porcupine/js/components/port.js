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
      isInput,
      isOutput,
    } = this.props;

    let portElement = '';
    if (isInput) {
      portElement = <span  className='node__port--input'/>
    } else if (isOutput) {
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

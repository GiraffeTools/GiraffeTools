import React from 'react';
import { connect } from 'react-redux';

import Port from '../components/port';


class Ports extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const ports = this.props.ports.filter(port => port.isVisible == true);;
    if (!ports || ports.length == 0) {
      return (<div/>)
    }
    return (
      <div className="node__ports">
        <ul>
          {
            ports.map(port => {
              return (
                <Port
                  id       = {port.id}
                  key      = {port.id}
                  name     = {port.name}
                  isInput  = {port.isInput}
                  isOutput = {port.isOutput}
                />
              )
            })
          }
        </ul>
      </div>
    );
  }
};

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ports)

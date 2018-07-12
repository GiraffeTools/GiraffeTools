import React from 'react';
import { connect } from 'react-redux';

import { toggleSidebar } from '../actions';
import Port from '../components/port';

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

class Ports extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const ports = this.props.ports;
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
                  key = {port.id}
                  name= {port.name}
                  input= {port.input}
                  output= {port.output}
                />
              )
            })
          }
        </ul>
      </div>
    );
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ports)

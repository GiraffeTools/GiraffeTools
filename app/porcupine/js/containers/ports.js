import React from 'react';
import { connect } from 'react-redux';

import { toggleSidebar } from '../actions';
import Port from '../components/port';

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

// const PortBlock = ({ports}) => {
class PortBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const ports = this.props.ports;
    const ports = [];
    return (
      <div className="node__ports">
      {
        ports.length > 0 && (
          <ul>
            {
              ports.map((port, index) => {
                <Port
                  port = {port}
                />
              })
            }
          </ul>
        )
      }
      </div>
    );
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortBlock)

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import TooltipData from '../components/tooltipData';


const mapStateToProps = state => ({
		hoveredNode: state.scene.hoverNode,
})

const mapDispatchToProps = dispatch => ({
});

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.hoveredNode) {
      return <div></div>;
    }

    const params = [];
    // Get the ports of the hovered node from state, issue #72
    // let nodePorts = this.props.hoveredNode.ports;
    let nodePorts = [];
    if (nodePorts.length > 10){
      nodePorts = nodePorts.filter(port => port.value)
    }

    Object.keys(nodePorts).forEach(i => {
      const port = nodePorts[i];
      params.push(
      <TooltipData
        id={port.name}
        key={port.name}
        data={{ name: port.name, type: port.type }}
        value={port.value}
        disabled={false}
      />
     );
    });

    return (
      <ReactTooltip multiline={true} id='getContent' effect='solid' place='right' className='customTooltip'>
        <div style={{display: 'inline-grid'}}>
          // {params}
        </div>
      </ReactTooltip>
    )

  }
}

Tooltip.propTypes = {
    hoveredNode: PropTypes.string,
    net: PropTypes.object,
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tooltip);

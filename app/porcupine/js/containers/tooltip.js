import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import TooltipData from '../components/tooltipData';
import {
	hoveredNode,
} from '../selectors/selectors';


const mapStateToProps = state => ({
		hoveredNode: hoveredNode(state),
});

const mapDispatchToProps = dispatch => ({
});

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
		const { hoveredNode } = this.props;
    if (!hoveredNode) {
      return <div></div>;
    }

    const params = [];
    // Get the ports of the hovered node from state, issue #72
    // let nodePorts = this.props.hoveredNode.ports;
    if (hoveredNode.ports.length > 10){
      hoveredNode.ports = hoveredNode.ports.filter(port => port.value);
    }

    return (
      <ReactTooltip multiline={true} id='getContent' effect='solid' place='right' className='customTooltip'>
        <div style={{display: 'inline-grid'}}>
          {
						hoveredNode.ports.map(port => (
							<TooltipData
								id={port.name}
								key={port.name}
								data={{ name: port.name, type: port.type }}
								value={port.value}
								disabled={false}
							/>
						))
					}
        </div>
      </ReactTooltip>
    )

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tooltip);

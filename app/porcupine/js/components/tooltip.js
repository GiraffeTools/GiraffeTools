import React from "react";
import ReactTooltip from "react-tooltip";

import TooltipData from "../components/tooltipData";

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { hoveredNode } = this.props;
    if (!hoveredNode) {
      return <div />;
    }

    const params = [];
    // Get the ports of the hovered node from state, issue #72
    // let nodePorts = this.props.hoveredNode.ports;
    if (hoveredNode.parameters.length > 10) {
      hoveredNode.parameters = hoveredNode.parameters.filter(
        port => port.value
      );
    }

    return (
      <ReactTooltip
        multiline={true}
        id="getContent"
        effect="solid"
        place="right"
        className="customTooltip"
      >
        <div style={{ display: "inline-grid" }}>
          {hoveredNode.parameters.map(port => (
            <TooltipData
              id={port.name}
              key={port.name}
              data={{ name: port.name, type: port.type }}
              value={port.value}
              disabled={false}
            />
          ))}
        </div>
      </ReactTooltip>
    );
  }
}

export default Tooltip;

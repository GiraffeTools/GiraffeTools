import React from "react";
import Radium from "radium";

import NestedPaneGroup from "./nestedPaneGroup";
import PaneHeader from "./paneHeader";
import DraggablePaneElement from "../draggables/draggablePaneElement";
import styles from "../styles/paneGroup";
import headerStyles from "../styles/paneHeader";

const PaneElements = ({ nodes, colour }) =>
  Object.keys(nodes).map(node => {
    const name = nodes[node]["title"]["name"].toString();
    nodes[node].colour = colour;
    return (
      <DraggablePaneElement key={name} category={nodes[node]} id={name}>
        {name}
      </DraggablePaneElement>
    );
  });

class PaneGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.toggleActive = this.toggleActive.bind(this);
  }

  toggleActive() {
    this.setState({ active: !this.state.active });
  }

  render() {
    const { nodes, category } = this.props;
    const { active } = this.state;

    return (
      <div style={[styles.panel]}>
        <div style={[headerStyles.panelHeading]} onClick={this.toggleActive}>
          <span
            className="badge" //bootstrap badge class
            style={[
              headerStyles.sidebarBadge,
              { backgroundColor: nodes.colour }
            ]}
          >
            {" "}
          </span>
          {category}
          <span style={[headerStyles.sidebarDropdown]}>{">"}</span>
        </div>
        <div
          style={[
            styles.panelCollapse,
            active && styles.panelCollapse.collapse
          ]}
        >
          <div aria-multiselectable="true">
            {active &&
              nodes.categories && (
                <NestedPaneGroup categories={nodes.categories} />
              )}
            {active &&
              nodes.nodes && (
                <PaneElements nodes={nodes.nodes} colour={nodes.colour} />
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(PaneGroup);

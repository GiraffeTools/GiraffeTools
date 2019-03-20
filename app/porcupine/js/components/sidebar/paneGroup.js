import React from "react";
import Radium from "radium";

import PaneHeader from "./paneHeader";
import DraggablePaneElement from "../../draggables/draggablePaneElement";
import styles from "../../styles/paneGroup";
import headerStyles from "../../styles/paneHeader";
import NestedPaneGroup from "./nestedPaneGroup";

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
    const { nodes, subcategories, colour, name } = this.props;
    const { active } = this.state;

    return (
      <div style={[styles.panel]}>
        <div style={[headerStyles.panelHeading]} onClick={this.toggleActive}>
          <span
            className="badge" //bootstrap badge class
            style={[
              headerStyles.sidebarBadge,
              { backgroundColor: colour || "#BBB" }
            ]}
          >
            {" "}
          </span>
          {name}
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
              subcategories && <NestedPaneGroup categories={subcategories} />}
            {active &&
              nodes &&
              nodes.map(node => {
                const { name } = node;
                node.colour = colour;
                return (
                  <DraggablePaneElement key={name} category={node} id={name}>
                    {name}
                  </DraggablePaneElement>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(PaneGroup);

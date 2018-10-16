import React from "react";
import PaneHeader from "./paneHeader";
import DraggablePaneElement from "../draggables/draggablePaneElement";

const NestedPaneGroup = ({ categories }) =>
  Object.keys(categories).map(category => (
    <PaneGroup
      key={category}
      category={category}
      nodes={categories[category]}
    />
  ));

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
      <div className="panel panel-default">
        <div className="panel-heading" role="tab" onClick={this.toggleActive}>
          <span
            className="badge sidebar-badge"
            style={{ backgroundColor: nodes.colour }}
          >
            {" "}
          </span>
          {category}
          <span className="sidebar-dropdown">></span>
        </div>
        <div
          className={`panel-collapse` + (active ? "" : " collapse")}
          role="tabpanel"
        >
          <div
            className="panel-group"
            role="tablist"
            aria-multiselectable="true"
          >
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

export default PaneGroup;

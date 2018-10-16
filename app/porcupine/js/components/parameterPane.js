import React from "react";

import Fields from "../components/fields";

class ParameterPane extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if (event.key == "Delete") {
      deleteNode(this.props.selectedNode.id);
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  render() {
    const node = this.props.selectedNode;
    return (
      <div className={"setparams" + (node ? " setparamsActive" : "")}>
        <div className="setHead">
          <h4 className="sidebar__node-name">{node ? node.name : ""}</h4>
          <div className="sidebar__node-documentation">
            {node ? (
              <a href={node.web_url} target="_blank">
                <i className="fas fa-globe sidebar__globe-icon" />
                <span>View documentation</span>{" "}
              </a>
            ) : (
              ""
            )}
          </div>
          <i
            className="fas fa-times sidebar__close-icon"
            onClick={() => this.props.clickNode(null)}
            aria-hidden="true"
          />
        </div>
        <div className="setContain">
          {node && node.ports ? <Fields ports={node.ports} /> : ""}
          <br />
          <button
            type="button"
            className="btn btn-block deleteLayerButton sidebar-heading"
            onClick={() => {
              this.props.deleteNode(node);
              this.props.clickNode(null);
            }}
          >
            DELETE NODE
          </button>
        </div>
      </div>
    );
  }
}

export default ParameterPane;

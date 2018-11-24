import React from "react";

import Fields from "../components/fields";

class ParameterPane extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if (event.key == "Delete") {
      console.log("implement delete (parameter pane)");
      // deleteNode(this.props.selectedNode.id);
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  render() {
    const { selectedNode, deleteNode, clickItem } = this.props;
    return (
      <div className={"setparams" + (selectedNode ? " setparamsActive" : "")}>
        <div className="setHead">
          <h4 className="sidebar__node-name">
            {selectedNode ? selectedNode.name : ""}
          </h4>
          <div className="sidebar__node-documentation">
            {selectedNode ? (
              <a href={selectedNode.web_url} target="_blank">
                <i className="fas fa-globe sidebar__globe-icon" />
                <span>View documentation</span>{" "}
              </a>
            ) : (
              ""
            )}
          </div>
          <i
            className="fas fa-times sidebar__close-icon"
            onClick={() => clickItem(null)}
            aria-hidden="true"
          />
        </div>
        <div className="setContain">
          {selectedNode && selectedNode.parameters ? (
            <Fields parameters={selectedNode.parameters} />
          ) : (
            ""
          )}
          <br />
          <button
            type="button"
            className="btn btn-block deleteLayerButton sidebar-heading"
            onClick={() => {
              deleteNode(selectedNode.id);
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

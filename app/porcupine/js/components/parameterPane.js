import React from "react";
import Radium from "radium";

import AddParameter from "../containers/addParameter";
import Fields from "../components/fields";
import styles from "../styles/parameterPane";

class ParameterPane extends React.Component {
  constructor(props) {
    super(props);
    this.changeName = this.changeName.bind(this);
  }

  changeName(event) {
    const { selectedNode, updateNode } = this.props;
    updateNode(selectedNode.id, { name: event.target.value });
  }

  render() {
    const { selectedNode, deleteNode, clickItem } = this.props;
    return (
      <div
        style={[styles.parameters, selectedNode && styles.parameters.active]}
        // rules={[styles.parameters.rules]}
        className="customScrollbar"
      >
        <div style={[styles.header]}>
          <h4 style={[styles.name]}>
            <input
              style={[styles.nameInput]}
              onChange={this.changeName}
              value={selectedNode ? selectedNode.name : ""}
            />
          </h4>
          <h6 style={[styles.className]}>
            class: <i>{selectedNode ? selectedNode.class : ""}</i>
          </h6>
          <div style={[styles.documentation]}>
            {selectedNode ? (
              <a href={selectedNode.web_url} target="_blank">
                <i style={[styles.globe]} className="fas fa-globe" />
                <span>View documentation</span>{" "}
              </a>
            ) : (
              ""
            )}
          </div>
          <i
            style={[styles.close]}
            className="fas fa-times"
            onClick={() => clickItem(null)}
            aria-hidden="true"
          />
        </div>
        <div style={[styles.fields]}>
          <AddParameter nodeId={selectedNode && selectedNode.id} />
          {selectedNode && selectedNode.parameters ? (
            <Fields parameters={selectedNode.parameters} />
          ) : (
            ""
          )}
          <br />
          <button
            style={[styles.delete]}
            className="btn btn-block"
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

export default Radium(ParameterPane);

import React from "react";
import Radium from "radium";

import Fields from "../components/fields";
import styles from "../styles/parameterPane";

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
      <div
        style={[styles.parameters, selectedNode && styles.parameters.active]}
        rules={styles.parameters.rules}
        className="customScrollbar"
      >
        <div style={[styles.header]}>
          <h4 style={[styles.name]}>{selectedNode ? selectedNode.name : ""}</h4>
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

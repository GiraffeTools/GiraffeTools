import React, { Fragment } from "react";
import { v4 } from "uuid";

class Port extends React.Component {
  constructor(props) {
    super(props);
    this.createLink = this.createLink.bind(this);
  }

  componentDidMount() {}

  createLink(e, type) {
    // if there is no link under construction, create one:
    if (!this.props.linkInConstruction) {
      this.props.startLink({
        port: this.props.id,
        startingAt: type
      });
      return;
    }

    // otherwise:
    const { linkInConstruction } = this.props;
    // #TODO move check to if (isValidConnection())
    // #TODO check if not circular
    if (
      type !== linkInConstruction.startingAt &&
      this.props.id !== linkInConstruction.port
    ) {
      this.props.addLink({
        id: v4(),
        portFrom: type === "output" ? this.props.id : linkInConstruction.port,
        portTo: type === "input" ? this.props.id : linkInConstruction.port
      });
    }
  }

  render() {
    const { name, isInput, isOutput, id, linkInConstruction } = this.props;
    const inputClicked =
      linkInConstruction &&
      linkInConstruction.port === id &&
      linkInConstruction.startingAt === "input"
        ? " port-clicked"
        : "";
    const outputClicked =
      linkInConstruction &&
      linkInConstruction.port === id &&
      linkInConstruction.startingAt === "output"
        ? " port-clicked"
        : "";
    // const inputPort = isInput ? (
    //   <span
    //     id={"input-" + id}
    //     className={"node__port--input" + inputClicked}
    //     onClick={event => this.createLink(event, "input")}
    //   />
    // ) : (
    //   ""
    // );
    // const outputPort = isOutput ? (
    //   <span
    //     id={"output-" + id}
    //     className={"node__port--output" + outputClicked}
    //     onClick={event => this.createLink(event, "output")}
    //   />
    // ) : (
    //   ""
    // );

    const { x, y, width } = this.props;

    return (
      <Fragment>
        <text
          fill="white"
          textAnchor="middle"
          x={x + width / 2}
          y={y}
        >
          {name}
        </text>
        {/* input */}
        {
          isInput && <circle
            cx={x}
            cy={y - 4}
            r={4}
            fill="#3498db"
          />
        }
        {/* output */}
        {
          isOutput && <circle
            cx={x + width}
            cy={y - 4}
            r={4}
            fill="#e74c3c"
          />
        }
      </Fragment>
    );
  }
}

export default Port;

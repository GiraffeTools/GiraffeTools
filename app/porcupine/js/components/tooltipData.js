import React from "react";

class TooltipData extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const type = this.props.data.type;
    let inputElement;
    if (type === "checkbox") {
      inputElement = this.props.value ? "True" : "False";
    } else {
      inputElement = this.props.value;
    }

    return (
      <div className="tooltipData">
        <p className="tooltipLabel">{this.props.data.name}:</p>
        <p className="tooltipField">{inputElement}</p>
      </div>
    );
  }
}

export default TooltipData;

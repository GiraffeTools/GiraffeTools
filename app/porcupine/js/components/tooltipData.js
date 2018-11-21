import React from "react";

const TooltipData = ({ data, value }) => {
  const type = data.type;
  let inputElement;
  if (type === "checkbox") {
    inputElement = value ? "True" : "False";
  } else {
    inputElement = value;
  }

  return (
    <div className="tooltipData">
      <p className="tooltipLabel">{data.name}:</p>
      <p className="tooltipField">{inputElement}</p>
    </div>
  );
};

export default TooltipData;

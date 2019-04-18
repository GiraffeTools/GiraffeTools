import React from "react";

const TooltipData = ({ name, type, value, height }) => {
  let inputElement;
  if (type === "checkbox") {
    inputElement = value ? "True" : "False";
  } else {
    inputElement = value;
  }
  let fieldText = `${name}: ${inputElement}`;
  const maxFieldWidth = 45;
  fieldText =
    fieldText.length < maxFieldWidth
      ? fieldText
      : fieldText.substring(0, maxFieldWidth) + "...";

  return (
    <text fill="white" y={height} x={8}>
      {fieldText}
    </text>
  );
};

export default TooltipData;

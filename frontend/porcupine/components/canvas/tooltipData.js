import React from 'react';

import "../../scss/unselectable.scss";

const TooltipData = ({name, type, value, height}) => {
  let inputElement;
  if (type === 'checkbox') {
    inputElement = value ? 'True' : 'False';
  } else {
    inputElement = value;
  }
  let fieldText = `${name}: ${inputElement}`;
  const maxFieldWidth = 45;
  fieldText =
    fieldText.length < maxFieldWidth
      ? fieldText
      : fieldText.substring(0, maxFieldWidth) + '...';

  return (
    <text fill="white" y={height} x={8} className="noselect">
      {fieldText}
    </text>
  );
};

export default TooltipData;

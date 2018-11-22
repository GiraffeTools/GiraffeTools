import React from "react";
import ReactTooltip from "react-tooltip";

import TooltipData from "../components/tooltipData";

const Tooltip = ({ parameters }) => {
  const parametersWithValues =
    parameters && parameters.filter(parameter => parameter.value !== "");
  const fieldHeight = 28;

  let parameterBlock;
  if (parametersWithValues.length == 0) {
    parameterBlock = (
      <text fill="white" y={fieldHeight / 2} x={8}>
        {"No parameters set"}
      </text>
    );
  } else {
    parameterBlock = parametersWithValues.map(function(parameter, index) {
      return (
        <TooltipData
          id={parameter.name}
          key={parameter.name}
          name={parameter.name}
          type={parameter.type}
          value={parameter.value}
          height={(index + 1) * fieldHeight}
        />
      );
    });
  }

  return (
    <g transform={`translate(${0},${-(parametersWithValues.length + 1) * 28})`}>
      <rect
        fill="black"
        opacity={0.5}
        rx={6}
        ry={6}
        width={400}
        height={(parametersWithValues.length + 0.6) * 28}
      />
      {parameterBlock}
    </g>
  );
};

export default Tooltip;

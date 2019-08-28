import React, {useState} from 'react';

import {truncateString} from '../../utils';

function getTextWidth(text, font) {
  // re-use canvas object for better performance
  const canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

function wrap(text, textParameters, maxWidth, maxLines) {
  const {x, y, fontSize, lineHeight} = textParameters;
  const words = text.split(' ');
  const lines = [];
  let line = 0;
  lines[line] = [];
  words.forEach((word) => {
    const newline = lines[line].join(' ');
    if (getTextWidth(newline) <= maxWidth) {
      lines[line].push(word);
    } else {
      line += 1;
      lines[line] = [word];
    }
  });
  const lineElements = lines.map((line, index) => (
    <tspan key={index} x={x} y={y + index * (fontSize + lineHeight)}>
      {line.join(' ')}
    </tspan>
  ));
  if (lineElements.length <= maxLines) {
    return lineElements;
  } else {
    const truncated = lineElements.slice(0, maxLines);
    truncated.push(
        <tspan key={maxLines} x={x} y={y + maxLines * (fontSize + lineHeight)}>
          {'......'}
        </tspan>
    );
    return truncated;
  }
}

const Sticky = (props) => {
  const {title, content, x, y, id, clickItem, updateSticky} = props;

  const [dragging, setDragging] = useState(false);
  const [hovered, setHover] = useState(false);
  const [draggingPosition, setDraggingPosition] = useState({x, y});
 
  const textParameters = {
    x: 290,
    y: 120,
    fontSize: 30,
    lineHeight: 1.25,
    style: '',
    fontFamily: 'NexaBold',
  };

  const maxLines = 8;
  const textwrap = wrap(content, textParameters, 100, maxLines);

  const drag = (event) => {
    setDraggingPosition({
      x: draggingPosition.x +  event.movementX,
      y: draggingPosition.y +  event.movementY,
    })
  }

  const startDrag = () => {
    setDragging(true)
    setDraggingPosition({x, y});
  }
  const endDrag = () => {
    setDragging(false)
    updateSticky(id, draggingPosition)
  }

  const {x: xPos, y: yPos} = dragging ? draggingPosition : props;
  return (
    <g 
      transform={`translate(${xPos},${yPos})`}
      onClick={() => clickItem(id, 'sticky')}
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)}
      onMouseDown={() => startDrag()}
      onMouseUp={() => endDrag()}
      onMouseMove={(event) => dragging && drag(event)}
    >
      <g transform="translate(0,100) scale(0.4,0.4)">
        <path
          d={'M 71.428571,29.321428 C 71.428571,35.035714 ' +
          '70,309.32143 70,309.32143 L 192.85714,480.75 l ' +
          '320,10 5.71429,-452.857143 -447.142859,-8.571429 z'}
          fill="url(#linearGradient4763)"
          fillOpacity={1}
          stroke="none"
          filter={hovered ? "url(#selection-glow)": ""}
        />
        <path
          d={'m 345.47217,485.90229 167.68532,5.05076 ' +
          '1.51523,-143.94674 -169.20055,138.89598 z'}
          fill="url(#linearGradient4767)"
          stroke="none"
        />
        <text
          fill="#777"
          fontFamily="Nexa-Bold"
          // textAnchor="middle"
          fontSize={'4rem'}
          x={80}
          y={90}
        >
          {truncateString(title, 10)}
        </text>
        <text
          fill="#777"
          textAnchor="middle"
          fontSize={'1.8rem'}
          x={textParameters[x]}
          y={textParameters[y]}
        >
          {textwrap}
        </text>
        <path
          d={'M 69.700526,308.62052 192.93914,480.85153 ' +
          '232.84016,361.14845 69.700526,308.62052 z'}
          fill="url(#linearGradient4765)"
          fillOpacity={1}
          stroke="none"
        />
      </g>
    </g>
  );
}
export default Sticky;

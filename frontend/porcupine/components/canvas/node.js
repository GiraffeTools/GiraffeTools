import React, {useState} from 'react';

import Parameter from './parameter';
import Tooltip from './tooltip';

const Node = (props) => {
  
  const {
    id,
    name,
    x,
    y,
    width,
    colour,
    selectedNodes,
    parameters,
    updateNode,
    clickItem 
  } = props;

  const [dragging, setDragging] = useState(false);
  const [hovered, setHover] = useState(false);
  const [xDragging, setDraggingX] = useState(x);
  const [yDragging, setDraggingY] = useState(y);

  const drag = (event) => {
    setDraggingX(xDragging +  event.movementX);
    setDraggingY(yDragging +  event.movementY);
    updateNode(id, {x: xDragging, y: yDragging})

  }

  const startDrag = () => {
    setDragging(true)
    setDraggingX(x);
    setDraggingY(y);
  }
  const endDrag = () => {
    setDragging(false);
    updateNode(id, {x: xDragging, y: yDragging})
  }

  const parameterBlock = [];
  let dy = 54;
  parameters &&
    parameters
        .filter((parameter) => parameter.isVisible == true)
        .forEach((parameter) => {
          parameterBlock.push(
              <Parameter
                {...parameter}
                key={parameter.id}
                width={width}
                x={0}
                y={dy}
              />
          );
          dy += 24;
        });

  return (
    <g 
      transform={`translate(${x},${y})`}
      onClick={() => clickItem(id, 'node')}
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)}
      onMouseDown={() => startDrag()}
      onMouseUp={() => endDrag()}
      onMouseMove={(event) => dragging && drag(event)}
    >
      <rect
        fill={colour}
        rx={6}
        ry={6}
        width={`${width}px`}
        height={dy}
        filter={
          selectedNodes && selectedNodes.includes(id)
            ? 'url(#selection-glow)'
            : ''
        }
      />
      <text
        fill="white"
        textAnchor="middle"
        x={width / 2}
        y={28}
        fontSize={'1.4rem'}
      >
        {name}
      </text>
      {parameterBlock}
      {hovered && <Tooltip parameters={parameters} />}
    </g>
  );
}

export default Node;

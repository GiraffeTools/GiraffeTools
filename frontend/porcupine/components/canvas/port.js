import React, {useState} from 'react';
import {v4} from 'uuid';

const Port = (props) => {

  const [linkUnderConstruction, setLinkUnderConstruction] = useState(null);
  const {hoverPort, addLink, hoveredPort, id, type, startLink, x, y} = props;

  const [dragging, setDragging] = useState(false);
  const [draggingPosition, setDraggingPosition] = useState({x, y});

  const drag = (event) => {
    startLink(id);
    setDraggingPosition({
      x: draggingPosition.x +  event.movementX,
      y: draggingPosition.y +  event.movementY,
    });
    setLinkUnderConstruction(draggingPosition);
  }

  const startDrag = () => {
    setDragging(true);
    setDraggingPosition({x, y});
  }
  const endDrag = () => {
    setDragging(false);
    if (hoveredPort && hoveredPort.type !== type) {
      addLink({
        id: v4(),
        portFrom: type === 'output' ? id : hoveredPort.id,
        portTo: type === 'input' ? id : hoveredPort.id,
      });
    }
    setLinkUnderConstruction(null);
  }

  let d = 'M';
  if (linkUnderConstruction) {
    // starting point
    d += `${x} ${y}`;
    // control points
    d += ` C`;
    d += ` ${(x * 1) / 4 + (linkUnderConstruction.x * 3) / 4} ${y}`;
    d += ` ${(x * 3) / 4 +
      (linkUnderConstruction.x * 1) / 4} ${linkUnderConstruction.y + 5}`;
    // end point
    d += ` ${linkUnderConstruction.x} ${linkUnderConstruction.y + 5}`;
  }

  return (
    <g
      onMouseEnter={() => hoverPort(id, type)} 
      onMouseLeave={() => hoverPort(null)}
      onMouseDown={() => startDrag()}
      onMouseUp={() => endDrag()}
      onMouseMove={(event) => dragging && drag(event)}
    >
      <circle
        cx={x}
        cy={y}
        r={4}
        fill={type === 'input' ? '#3498db' : '#e74c3c'}
        cursor="pointer"
        strokeWidth="20"
        stroke="transparent"
      />
      {linkUnderConstruction && (
        <path
          d={d}
          stroke="black"
          strokeWidth="2"
          fill="none"
          r={10}
        />
      )}
    </g>
  );
}
export default Port;

import React, {Fragment, useState, useRef, useEffect } from 'react';

const Link = (props) => {
  const [hovered, setHover] = useState(false);
  const {clickItem, id} = props;

  const {portFrom, portTo, selectedLinks} = props;
  if (!portFrom || !portTo) {
    return <g />;
  }
  const startingPoint = {x: portFrom.x, y: portFrom.y + 5};
  const endPoint = {x: portTo.x, y: portTo.y + 5};

  let d = 'M';
  // starting point
  d += `${startingPoint.x} ${startingPoint.y}`;
  // control points
  d += ` C`;
  d += ` ${(startingPoint.x * 1) / 4 + (endPoint.x * 3) / 4} ${
    startingPoint.y
  }`;
  d += ` ${(startingPoint.x * 3) / 4 + (endPoint.x * 1) / 4} ${endPoint.y}`;
  // end point
  d += ` ${endPoint.x} ${endPoint.y}`;
  return (
    <Fragment>
      // This is for rendering...
      <path
        d={d}
        stroke="black"
        strokeWidth="2"
        fill="none"
        r={10}
        filter={
          hovered || (selectedLinks && selectedLinks.includes(id))
            ? 'url(#selection-glow)'
            : ''
        }
        cursor={'pointer'}
      />
      // ...and this is for clicking (note the 'transparent' tag)
      <path
        onClick={() => clickItem(id, 'link')}
        onMouseEnter={() => setHover(true)} 
        onMouseLeave={() => setHover(false)}
        d={d}
        stroke="transparent"
        strokeWidth="24"
        fill="none"
        r={10}
        cursor={'pointer'}
      />
    </Fragment>
  );
}
export default Link;

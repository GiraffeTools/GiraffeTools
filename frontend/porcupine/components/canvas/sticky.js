import React from 'react';
import * as d3 from 'd3';

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
  const {x, y, fontSize, fontFamily, lineHeight, style} = textParameters;
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

class Sticky extends React.Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
    this.hover = this.hover.bind(this);
    this.drag = this.drag.bind(this);

    this.state = {
      hovered: false,
    };
  }

  componentDidMount() {
    d3.select(this.svgRef)
        .on('click', this.click)
        .on('mouseenter', () => this.hover(true))
        .on('mouseleave', () => this.hover(false))
        .call(d3.drag().on('start', () => this.drag()));
  }

  click() {
    const {clickItem, id} = this.props;
    clickItem(id, 'sticky');
    d3.event.stopPropagation();
  }

  hover(enter) {
    this.setState({
      hovered: enter,
    });
    d3.event.stopPropagation();
  }

  drag() {
    const {x, y, id, updateSticky} = this.props;
    let dx = 0;
    let dy = 0;
    function dragged() {
      dx += d3.event.dx;
      dy += d3.event.dy;
      updateSticky(id, {x: x + dx, y: y + dy});
    }

    function ended() {}
    d3.event.on('drag', dragged).on('end', ended);
  }

  render() {
    const {title, content, x, y} = this.props;

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

    return (
      <g ref={(svg) => (this.svgRef = svg)} transform={`translate(${x},${y})`}>
        <g transform="translate(0,100) scale(0.4,0.4)">
          <path
            d="M 71.428571,29.321428 C 71.428571,35.035714 70,309.32143 70,309.32143 L 192.85714,480.75 l 320,10 5.71429,-452.857143 -447.142859,-8.571429 z"
            fill="url(#linearGradient4763)"
            fillOpacity={1}
            stroke="none"
            // filter={"url(#selection-glow)"}
          />
          <path
            d="m 345.47217,485.90229 167.68532,5.05076 1.51523,-143.94674 -169.20055,138.89598 z"
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
            fontSize={'2rem'}
            x={textParameters[x]}
            y={textParameters[y]}
          >
            {textwrap}
          </text>
          <path
            d="M 69.700526,308.62052 192.93914,480.85153 232.84016,361.14845 69.700526,308.62052 z"
            fill="url(#linearGradient4765)"
            fillOpacity={1}
            stroke="none"
          />
        </g>
      </g>
    );
  }
}
export default Sticky;

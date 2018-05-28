import PropTypes from 'prop-types';
import React from 'react'

class Node extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { x, y, colour, class: classname, id, type, click, ports, hover, leave } = this.props;
    const visiblePorts = ports.filter(port => port.visible);
    return (
      <div
        className={`node ${classname}`}
        style={{
          left:`${x}px`,
          top: `${y}px`,
          background: colour
        }}
        onClick={(event) => click(event, id)}
        onTouchEnd={(event) => click(event, id)}
        onMouseEnter={(event) => hover(event, id)}
        onMouseLeave={(event) => leave(event)}
        data-tip='tooltip'
        data-for='getContent'
      >
        <div className="node__type">
          {type}
        </div>

        <div className="node__ports">
          {
            visiblePorts.length > 0 && (
              <ul>
                {
                  visiblePorts.map((port, index) => {
                    let portClassName = '';
                    if (port.input) {
                      portClassName = 'node__port--input';
                    } else if (port.output) {
                      portClassName = 'node__port--output';
                    }

                    return (
                      <li key={index}>
                        <div className={`node__port ${portClassName}`}>
                          {port.name}
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            )
          }
        </div>
      </div>
    )
  }
}

Node.propTypes = {
  type:   PropTypes.string.isRequired,
  colour: PropTypes.string.isRequired,
  x:      PropTypes.number.isRequired,
  y:      PropTypes.number.isRequired,
  click:  PropTypes.func.isRequired,
  hover:  PropTypes.func.isRequired,
  leave:  PropTypes.func.isRequired,
  class:  PropTypes.string,
  ports:  PropTypes.array.isRequired
}

export default Node;

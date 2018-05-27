import PropTypes from 'prop-types';
import React from 'react'

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.connectPort   = this.connectPort.bind(this);
    this.connect       = this.connect.bind(this);
  }

  connectPort(e) {
    e.stopPropagation()
    this.connect(e.target)
  }
  connect(el) {
    $(el).off('click')
    var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var l = document.createElementNS("http://www.w3.org/2000/svg", "line");
    l.setAttribute("x1", "4");
    l.setAttribute("y1", "4");
    l.setAttribute("stroke", "black");
    el.appendChild(s);
    s.appendChild(l);
    var xi=s.getClientRects()[0].x
    var yi=s.getClientRects()[0].y
    l.setAttribute("x2", 4);
    l.setAttribute("y2", 4);
        var that=this
        console.log(this)
    $('#zoomContainer').on('click', function(e) {
      if (e.target.classList[0]==="node__port--input") {
        // x=e.pageX-xi
        // y=e.pageY-yi
        var x, y
        ({x,y}=e.target.getClientRects()[0])
        x=x-xi+4
        y=y-yi+4
        console.log(e.target.getClientRects()[0],x,y)
        l.setAttribute("x2", x);
        l.setAttribute("y2", y);
        $(el).on('click', (e)=>{
          e.stopPropagation()
          that.connect(el)
        })
      } else{
        el.removeChild(s)
        $(el).on('click', (e)=>{
          e.stopPropagation()
          that.connect(el)
        })
      }
      $('#zoomContainer').off('mousemove')
      $('#zoomContainer').off('click')
    })
    $('#zoomContainer').on('mousemove', function(e) {
      var x=e.pageX-xi
      var y=e.pageY-yi
      l.setAttribute("x2", x);
      l.setAttribute("y2", y);
    })
  }
  render() {
    const { x, y, colour, class: classname, id, type, click, ports } = this.props;
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
                    let portElement = '';
                    if (port.input) {
                      portElement = <span  className='node__port--input'/>
                    } else if (port.output) {
                      portElement = <span onClick={(event) => this.connectPort(event)} className='node__port--output'/>
                    }

                    return (
                      <li key={index}>
                        <div className='node__port'>
                          {port.name}
                          {portElement}
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
  class:  PropTypes.string,
  ports: PropTypes.array.isRequired
}

export default Node;

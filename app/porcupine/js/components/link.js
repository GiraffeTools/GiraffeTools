import PropTypes from 'prop-types';
import React from 'react';


class Link extends React.Component {
  constructor(props) {
    super(props);
    this.connectPort   = this.connectPort.bind(this);
    this.connect       = this.connect.bind(this);
  }


  connectPort(e, portKey) {
    e.stopPropagation()
    this.connect(e.target)
  }

  connect(el) {
    $(el).off('click')
    // TODO: make the following grab from https instead of http
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const l = document.createElementNS("http://www.w3.org/2000/svg", "path");
    // l.setAttribute('d', 'M4 4 C ')
    el.appendChild(s);
    s.appendChild(l);
    const xi=s.getClientRects()[0].x;
    const yi=s.getClientRects()[0].y;
    l.setAttribute("x2", 4);
    l.setAttribute("y2", 4);
    const that=this;
    $('#zoomContainer').on('click', function(e) {
      if (e.target.classList[0]==="node__port--input") {
        let x, y
        ({x,y}=e.target.getClientRects()[0])
        x=x-xi+4
        y=y-yi+4
        if (x>0) {
          l.setAttribute("d", 'M4 4 C '+x/2+' 4, '+x/2+' '+y+', '+x+' '+y);
        } else {
          l.setAttribute("d", 'M4 4 C '+(-x/2)+' '+y/2+', '+(3*x/2)+' '+y/2+', '+x+' '+y);
        }
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
      const x=e.pageX-xi
      const y=e.pageY-yi
      if (x>0) {
        l.setAttribute("d", 'M4 4 C '+x/2+' 4, '+x/2+' '+y+', '+x+' '+y);
      } else {
        l.setAttribute("d", 'M4 4 C '+(-x/2)+' '+y/2+', '+(3*x/2)+' '+y/2+', '+x+' '+y);
      }
    })
    // this.props.addNewLink();
  }

  render() {

  }
}


export default Link;

import React from 'react';
import PropTypes from 'prop-types';

class PanZoomView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
       scale: 1,
       translation:{ x:0, y: 0 },
    };
  }

  componentDidMount() {
    const rec = document.getElementById('maincanvas').getBoundingClientRect();
    $("#panview").css({"height": `${rec.height}`});

    //Disable scrolling
    $("#panview").bind("mousewheel DOMMouseScroll", function(e) {
      var scrollTo = null;

         if (e.type == 'mousewheel') {
             scrollTo = (e.originalEvent.wheelDelta * -1);
         }
         else if (e.type == 'DOMMouseScroll') {
             scrollTo = 40 * e.originalEvent.detail;
         }

         if (scrollTo) {
             e.preventDefault();
             $(this).scrollTop(scrollTo + $(this).scrollTop());
         }
    }
  );

		// #TODO remove/replace zoomFunctions in issue #73
		// setBoundingBox();
    // this.mouseState = zoomFunctions();
  }


  relativePos(pos, canvasRect) {
    let center = { x:canvasRect.x+0.5*canvasRect.width, y:canvasRect.y+0.5*canvasRect.height }
    let newp = { x:pos.x-center.x, y:(pos.y-center.y) }

    return newp;
  }

  applyZoom(position, scaleToApply) {
    const prevScale = this.state.scale;
    const prevTranslation = this.state.translation;

    let rect = document.getElementById('maincanvas').getBoundingClientRect();

    let translation = this.relativePos(position, rect);
    translation.x = -translation.x*(scaleToApply-1);
    translation.y = -translation.y*(scaleToApply-1);

    translation.x = translation.x+prevTranslation.x*scaleToApply;
    translation.y = translation.y+prevTranslation.y*scaleToApply;

    let newScale = prevScale*scaleToApply;

    this.setState({
       scale: newScale,
       translation: translation,
    });
  }

  handleZoom(e) {
    let mousePos = {x: e.clientX, y: e.clientY };
    let scaleToApply;
    if(e.deltaY < 0)
      scaleToApply = 1.25;
    else
      scaleToApply = 0.75;

    this.applyZoom(mousePos, scaleToApply);
  }

  getContentStyle () {
      return {
        position: 'relative',
        width: '100%',
        height: '100%',
        align: 'center',
        display: 'flex',
        alignItems: 'center',
        transform: `translateX(${this.state.translation.x}px) translateY(${this.state.translation.y}px) scale(${this.state.scale})`,
        transition: '.3s ease-out'
      }
    }

  wheel(e)
  {
    this.handleZoom(e);
  }

  mousedown(e)
  {
    if(e.buttons==1)
    {
      this.startDragPos = {x:e.screenX, y:e.screenY};
      this.currentTranslation = { x:this.state.translation.x, y:this.state.translation.y }
    }
  }

  clickZoomButton(e, scale)
  {
    let rect = document.getElementById('maincanvas').getBoundingClientRect();
    let center = { x:rect.x+0.5*rect.width, y:rect.y+0.5*rect.height }

    this.applyZoom(center, scale);
  }

  mousemove(e)
  {
    if(e.buttons==1)
    {
      let translation = { x:e.screenX-this.startDragPos.x, y:e.screenY-this.startDragPos.y };
      translation.x += this.currentTranslation.x;
      translation.y += this.currentTranslation.y;

      this.setState({
         translation: translation,
      });
    }
  }

  keypress(e)
  {
    console.log(e);
    let rect = document.getElementById('maincanvas').getBoundingClientRect();
    let center = { x:rect.x+0.5*rect.width, y:rect.y+0.5*rect.height }
    if(e.key=='+'||e.key=='=')
      this.applyZoom(center, 1.25);
    else if(e.key=='-')
      this.applyZoom(center, 0.75);
  }

  render() {
		const { children } = this.props;
    return (
      <div>
        <div id="panview" style={this.getContentStyle()} onWheel={(e) => this.wheel(e)} onMouseDown={(e) => this.mousedown(e)} onMouseMove={(e) => this.mousemove(e)}>
			     {children}
          </div>
          <div id='icon-plus' className="canvas-icon">
           <p>Press</p>
           <button className="btn btn-default text-center" onClick={(e) => this.clickZoomButton(e,1.25)}>
             <span aria-hidden="true">+</span>
             </button>
           </div>

           <div id='icon-minus' className="canvas-icon">
             <p>Press</p>
             <button className="btn btn-default text-center" onClick={(e) => this.clickZoomButton(e,0.75)}>
                 <span aria-hidden="true">-</span>
             </button>
           </div>

      </div>
    );
  }
}

PanZoomView.propTypes = {
  children: PropTypes.element,
}
export default PanZoomView

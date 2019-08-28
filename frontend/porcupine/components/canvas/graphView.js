import React from 'react';
import {save} from 'save-file';
import pretty from 'pretty';
import {saveSvgAsPng} from 'save-svg-as-png';
import {INITIAL_VALUE, TOOL_NONE, ReactSVGPanZoom} from 'react-svg-pan-zoom';
import {POSITION_RIGHT, ALIGN_CENTER, ALIGN_RIGHT} from 'react-svg-pan-zoom';
import {AutoSizer} from 'react-virtualized';

import CustomDragLayer from '../../draggables/customDragLayer';
import Links from './links';
import Nodes from './nodes';
import Stickies from './stickies';
import Toolbar from '../../containers/toolbar';
import styleSheet from '../../constants/styles';

import '../../scss/graphView.scss';


const defaults = {
  minZoom: 0.15,
  maxZoom: 1.5,
  gridSpacing: 36,
  gridDot: 2,
  gridSize: 40960,
  zoomDuration: 750,
};

const Background = () => (
  <rect
    className="background"
    x={-defaults.gridSize / 4}
    y={-defaults.gridSize / 4}
    width={defaults.gridSize}
    height={defaults.gridSize}
    fill="url(#grid)"
  />
);

class GraphView extends React.Component {
  constructor(props) {
    super(props);
    this.viewer = React.createRef(null);
    this.entities = React.createRef(null);

    this.state = {
      value: INITIAL_VALUE,
      tool: TOOL_NONE
    };

    this.printCanvas = this.printCanvas.bind(this);
    this.updateViewerBox = this.updateViewerBox.bind(this);
    
  }

  updateViewerBox() {
    // const {entities} = this;
    // if(!entities) return 
    // const boundingbox = entities.getBBox();

    // const {value} = this.state;
    // console.log({value});
    // // debugger
    // this.changeValue({
    //   ...value, 
    //   SVGHeight: boundingbox.height,
    //   SVGWidth: boundingbox.width,
    //   SVGX: boundingbox.x,
    //   SVGY: boundingbox.y,
      
    // })

  }

  componentDidMount() {
  }  
  
  changeTool(nextTool) {
    this.setState({tool: nextTool})
  }

  changeValue(nextValue) {
    this.setState({value: nextValue})
  }

  renderDefs() {
    return (
      <defs>
        <pattern
          id="grid"
          key="grid"
          width={defaults.gridSpacing}
          height={defaults.gridSpacing}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={defaults.gridSpacing / 2}
            cy={defaults.gridSpacing / 2}
            r={defaults.gridDot}
            fill="lightgray"
          />
        </pattern>

        <filter id="selection-glow">
          <feColorMatrix
            type="matrix"
            values="0 0 0 0   0
                       0 0 0 0   0
                       0 0 0 0   0
                       0 0 0 0.7 0"
          />
          <feGaussianBlur stdDeviation="5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="linearGradient4752">
          <stop id="stop4754" offset="0" stopColor="#fed661" stopOpacity={1} />
          <stop id="stop4756" offset="1" stopColor="#edc63d" stopOpacity={1} />
        </linearGradient>

        <linearGradient id="linearGradient4701">
          <stop stopColor="#fed661" stopOpacity={1} offset="0" id="stop4703" />
          <stop stopColor="#fed12f" stopOpacity={1} offset="1" id="stop4705" />
        </linearGradient>

        <linearGradient
          xlinkHref="#linearGradient4701"
          id="linearGradient4763"
          gradientUnits="userSpaceOnUse"
          x1="318.57144"
          y1="42.17857"
          x2="294.28571"
          y2="437.89285"
        />
        <linearGradient
          xlinkHref="#linearGradient4752"
          id="linearGradient4765"
          gradientUnits="userSpaceOnUse"
          x1="187.14285"
          y1="465.03571"
          x2="151.27034"
          y2="308.62051"
        />
        <linearGradient
          xlinkHref="#linearGradient4701"
          id="linearGradient4767"
          gradientUnits="userSpaceOnUse"
          x1="344.97217"
          y1="418.97968"
          x2="515.17273"
          y2="418.97968"
        />
      </defs>
    );
  }

  async printCanvas(format) {
    const svgElement = this.canvas;

    const svgElementToFile = (element) => {
      const svgString = pretty(element.outerHTML).split('\n');
      const svgXmlString = `<?xml
      version="1.0"
      encoding="iso-8859-1"?>
      <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
      "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
      `;

      const svgFirstLine = `<svg
      height="100%"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">`;
      svgString[0] = svgFirstLine;
      return svgXmlString + svgString.join('\n');
    }

    switch (format) {
      case 'SVG':
        save(pretty(svgElementToFile(svgElement)), 'canvas.svg');
        break;
      case 'PNG':
        saveSvgAsPng(svgElement, 'canvas.png');
        break;
      default:
        save(pretty(svgElementToFile(svgElement)), 'canvas.svg');
        break;
    }
  }

  render() {
    const {nodes, links, stickies, deleteSelection} = this.props;
    const {value, tool} = this.state;
    const boundingbox = this.entities.getBBox && this.entities.getBBox();
    const {x, y, width: w, height: h} = boundingbox || {};
    return (
      <div className="viewWrapper">
        <Toolbar
          zoomToFit={this.handleZoomToFit}
          deleteSelection={deleteSelection}
          printCanvas={this.printCanvas}
        />
       <AutoSizer>
          {(({width, height}) => width === 0 || height === 0 ? null : (
            <ReactSVGPanZoom
              ref={(viewer) => this.viewer = viewer}
              tool={tool} onChangeTool={tool => this.changeTool(tool)}
              value={value} onChangeValue={value => this.changeValue(value)}
              width={width} 
              height={height}
              SVGBackground={styleSheet.primaryLightSecondaryColor}
              background={"#fff"}
              miniatureProps={{position: POSITION_RIGHT}}
              toolbarProps={{position: POSITION_RIGHT, SVGAlignY: ALIGN_CENTER, SVGAlignX: ALIGN_CENTER}}
              // background={styleSheet.primaryLightSecondaryColor}
            >
              <svg
                withViewBox={`${x || 0} ${y || 0} ${w || width} ${h || height}`}
              >
                {this.renderDefs()}
                <g 
                  className="view" 
                  ref={(el) => (this.view = el)}
                >
                  <Background />
                  <g 
                    className="entities" 
                    ref={(el) => (this.entities = el)}
                  >
                    <Stickies stickies={stickies} />
                    <Nodes nodes={nodes} />
                    <Links links={links} />
                    <CustomDragLayer />
                  </g>
                </g>
              </svg>

            </ReactSVGPanZoom>
          ))}
        </AutoSizer>
      </div>
    );
  }
}

export default GraphView;

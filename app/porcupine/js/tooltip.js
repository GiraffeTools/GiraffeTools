import PropTypes from 'prop-types';
import React from 'react';
import TooltipData from './tooltipData';
import ReactTooltip from 'react-tooltip';

class Tooltip extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        if (this.props.hoveredNode && this.props.hoveredNode in this.props.net) {
          const params = [];
          let nodePorts = this.props.net[this.props.hoveredNode].ports;
          if (nodePorts.length > 10){ nodePorts = nodePorts.filter(port => port.value)}

          Object.keys(nodePorts).forEach(i => {
            const port = nodePorts[i];
            params.push(
            <TooltipData
              id={port.name}
              key={port.name}
              data={{ name: port.name, type: port.type }}
              value={port.value}
              disabled={false}
              changeField={this.changeParams}
            />
           );
          });

          return (
            <ReactTooltip multiline={true} id='getContent' effect='solid' place='right' className='customTooltip'>
              <div style={{display: 'inline-grid'}}>
                {params}
              </div>
            </ReactTooltip>
          )
       }
       else return <div></div>;
    }
}

Tooltip.propTypes = {
    hoveredNode: PropTypes.string,
    net: PropTypes.object,
};

export default Tooltip;

import PropTypes from 'prop-types';
import React from 'react';
import data from './data';

class Layer extends React.Component {
  componentDidMount() {
    instance.addLayerEndpoints(this.props.id,
      data[this.props.type].endpoint.src,
      data[this.props.type].endpoint.trg
    );
  }
  componentWillUnmount() {
    instance.deleteEndpoint(`${this.props.id}-s0`);
    instance.deleteEndpoint(`${this.props.id}-t0`);
  }
  render() {
    return (
      <div
        className={`layer ${this.props.class}`}
        id={this.props.id}
        style={{
          top:this.props.top,
          left:this.props.left,
          background: data[this.props.type].color
        }}
        data-type={this.props.type}
        onClick={(event) => this.props.click(event, this.props.id)}
        onMouseEnter={(event) => this.props.hover(event, this.props.id)}
        data-tip='tooltip'
        data-for='getContent'
      >
        {data[this.props.type].name}
      </div>
    );
  }
}

Layer.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  top: PropTypes.string.isRequired,
  left: PropTypes.string.isRequired,
  class: PropTypes.string,
  click: PropTypes.func,
  hover: PropTypes.func
};

export default Layer;

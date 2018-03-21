import PropTypes from 'prop-types';
import React from 'react'

class Node extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={`node ${this.props.class}`}
        style={{
          left:`${this.props.x}px`,
          top: `${this.props.y}px`,
          background: this.props.colour
        }}
        onClick={(event) => this.props.click(event, this.props.id)}
      >
        {this.props.type}
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
}

export default Node;

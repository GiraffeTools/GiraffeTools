import PropTypes from 'prop-types';
import React from 'react'

class PaneElement extends React.Component {
  constructor(props) {
    super(props);
    this.drag = this.drag.bind(this);
    this.touchdrag = this.touchdrag.bind(this);
  }

  drag(e) {
  console.log('drag',e.dataTransfer);
    e.dataTransfer.setData('element_type', this.props.category.concat(e.target.id).join(','));
  }
  touchdrag(e) {
  console.log('touch',e.target)
    e.dataTransfer.setData('element_type', this.props.category.concat(e.target.id).join(','));
  }

  render() {
    return (
      <div
        className="btn btn-block drowpdown-button"
        draggable="true"
        onDragStart={this.drag}
        onTouchStart={this.touchdrag}
        id={this.props.id}
      >
        {this.props.children}
      </div>
    );
  }
}

PaneElement.propTypes = {
  category: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
}

export default PaneElement;

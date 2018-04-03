import PropTypes from 'prop-types';
import React from 'react'

class PaneElement extends React.Component {
  constructor(props) {
    super(props);
    this.drag = this.drag.bind(this);
  }

  drag(e) {
    e.dataTransfer.setData('element_type', this.props.category.concat(e.target.id).join(','));
  }

  render() {
    return (
      <div
        className="btn btn-block drowpdown-button"
        draggable="true"
        onDragStart={this.drag}
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

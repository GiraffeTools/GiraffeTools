import PropTypes from 'prop-types';
import React from 'react'
import { DragSource } from 'react-dnd'
import ItemTypes from './itemTypes'


const boxSource = {
	beginDrag(props) {
		return {
			name: props.id,
			element_type: props.category.concat(props.id)
		}
	},

	endDrag(props, monitor) {
		const item = monitor.getItem()
		const dropResult = monitor.getDropResult()

		if (dropResult) {
			console.log(`You dropped ${item.name} into ${dropResult.name}!`)
		}
	},
}

class PaneElement extends React.Component {
  constructor(props) {
    super(props);
    this.drag = this.drag.bind(this);
  }

  drag(e) {
    e.dataTransfer.setData('element_type', this.props.category.concat(e.target.id).join(','));
  }

  render() {
		const { isDragging, connectDragSource } = this.props
		const name = this.props.id
		const opacity = isDragging ? 0.4 : 1

    return connectDragSource (
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
  children: PropTypes.string.isRequired,
	connectDragSource: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired,
}

export default DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))(PaneElement)

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

	// endDrag(props, monitor) {
	// 	const item = monitor.getItem()
	// 	const dropResult = monitor.getDropResult()

	// 	if (dropResult) {
	// 		console.log(`You dropped ${item.name} into ${dropResult.name}!`)
	// 	}
	// },
}

class PaneElement extends React.Component {

  render() {
		const { isDragging, connectDragSource, connectDragPreview } = this.props
		const name = this.props.id
    const offset = {x: 0, y: 0}

    let content = (
      <div
        className="btn btn-block drowpdown-button"
        draggable="true"
        style={{ opacity: isDragging ? 0.5 : 1 }}
        id={this.props.id}
      >
        {this.props.children}
      </div>
    )

    content = connectDragSource(content)

    content = connectDragPreview(content)

    return content;
      
  }
}

PaneElement.propTypes = {
  category: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
	connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
}

export default DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
	isDragging: monitor.isDragging(),
}))(PaneElement)

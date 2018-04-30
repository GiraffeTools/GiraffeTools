import React from 'react';
import PropTypes from 'prop-types';
import DragLayer from 'react-dnd/lib/DragLayer';

function collect (monitor) {
    var item = monitor.getItem();
    return {
        name: item && item.name,
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    };
}

function getItemStyles (currentOffset) {
    if (!currentOffset) {
        return {
            display: 'none'
        };
    }

    var x = currentOffset.x;
    var y = currentOffset.y;
    var transform = `translate(${x}px, ${y}px)`;

    return {
        pointerEvents: 'none',
        transform: transform,
        WebkitTransform: transform
    };
}

class ItemPreview extends React.Component {
    render() {
        if (!this.props.isDragging) {
            return (
                <div className="node preview" style={{display: 'none'}} > </div>
            );
        }
        return (
            <div
                className="node preview"
                style={getItemStyles(this.props.currentOffset)}
            >
                {this.props.name}
            </div>
        );
    }
}

ItemPreview.propTypes = {
    name: PropTypes.string,
    currentOffset: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    }),
    isDragging: PropTypes.bool
};

export default DragLayer(collect)(ItemPreview);

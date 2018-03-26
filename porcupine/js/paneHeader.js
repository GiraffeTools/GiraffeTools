import PropTypes from 'prop-types';
import React from 'react';

class PaneHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const divRef = "#" + this.props.name;
    return (
      <div className="panel-heading" role="tab">
        <span className="badge sidebar-badge" style={{backgroundColor : this.props.color}}> </span>
          {this.props.name}
        <a data-toggle="collapse" href={divRef} aria-expanded="false" aria-controls={this.props.name}>
          <span className='glyphicon sidebar-dropdown glyphicon-menu-right'></span>
        </a>
      </div>
    );
  }
}

PaneHeader.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}

export default PaneHeader;

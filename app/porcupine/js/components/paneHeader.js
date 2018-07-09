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
        <a data-toggle="collapse" href={divRef} aria-expanded="false" aria-controls={this.props.name}>
        <span className="badge sidebar-badge" style={{backgroundColor : this.props.color}}> </span>
          {this.props.name}
          <span className='sidebar-dropdown'>></span>
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

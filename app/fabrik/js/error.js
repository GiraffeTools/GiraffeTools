import PropTypes from 'prop-types';
import React from 'react';

class Error extends React.Component {
  constructor(props) {
    super(props);
    this.dismissError = this.dismissError.bind(this);
  }
  dismissError() {
    this.props.dismissError(this.props.index);
  }
  render() {
    return (
      <div className="error">
        <button type="button" className="close" onClick={this.dismissError}>
          <span aria-hidden="true">&times;</span>
        </button>
        {this.props.text}
      </div>
    );
  }
}

Error.propTypes = {
  text: PropTypes.string.isRequired,
  index: PropTypes.number,
  dismissError: PropTypes.func
};

export default Error;

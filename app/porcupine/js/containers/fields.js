import React from 'react';
import { connect } from 'react-redux';

import Field from '../components/field'
import {
  selectedPorts,
} from '../selectors/selectors'


class Fields extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="form-horizontal">
        {
          this.props.selectedPorts.map(port => (
            <Field
              key={port.id}
              port={port}
            />
          ))
        }
      </form>
    );
  }
};

const mapStateToProps = state => ({
		selectedPorts: selectedPorts(state),
})

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fields);

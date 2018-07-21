import React from 'react';

import Field from '../components/field'


class Fields extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="form-horizontal">
        {
          this.props.ports.map(port => (
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

export default Fields;

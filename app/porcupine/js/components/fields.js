import React from "react";

import FieldContainer from "../containers/fieldContainer";

class Fields extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="form-horizontal">
        {this.props.parameters.map(port => (
          <FieldContainer {...port} key={port.id} />
        ))}
      </form>
    );
  }
}

export default Fields;

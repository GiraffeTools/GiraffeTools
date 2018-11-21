import React from "react";

import FieldContainer from "../containers/fieldContainer";

const Fields = ({ parameters }) => (
  <form className="form-horizontal">
    {parameters.map(port => (
      <FieldContainer {...port} key={port.id} />
    ))}
  </form>
);

export default Fields;

import React from "react";

import FieldContainer from "../containers/fieldContainer";

const Fields = ({ parameters }) => (
  <form className="form-horizontal">
    {parameters.map(parameter => (
      <FieldContainer {...parameter} key={parameter.id} />
    ))}
  </form>
);

export default Fields;

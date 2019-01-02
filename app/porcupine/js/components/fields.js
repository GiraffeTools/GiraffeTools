import React from "react";

import Field from "../containers/field";

const Fields = ({ parameters }) => (
  <form className="form-horizontal">
    {parameters.map(parameter => (
      <Field {...parameter} key={parameter.id} />
    ))}
  </form>
);

export default Fields;

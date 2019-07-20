import React, { Fragment } from "react";

import Sticky from "../../containers/sticky";

const Stikies = ({ stickies }) => (
  <Fragment>
    {stickies && stickies.map(sticky => <Sticky {...sticky} key={sticky.id} />)}
  </Fragment>
);

export default Stikies;

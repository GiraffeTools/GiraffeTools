import React from "react";

const SmallScreenAlert = () => (
  <div
    id="alert-small-screen"
    className="alert alert-info alert-dismissible fade show"
    role="alert"
  >
    <button
      type="button"
      className="close"
      data-dismiss="alert"
      aria-label="Close"
    >
      <span aria-hidden="true">&times;</span>
    </button>
    Welcome! This website has not been optimised for small screens so things
    might look a bit quirky!
  </div>
);

export default SmallScreenAlert;

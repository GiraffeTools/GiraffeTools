import React from "react";

const SmallScreenAlert = ({ showSmallScreenAlert, toggleSmallScreenAlert }) => (
  <div
    className={
      "alert alert-info" + (showSmallScreenAlert ? "" : " alert-close")
    }
    id="alert-small-screen"
  >
    <button
      type="button"
      className="close"
      data-dismiss="alert"
      onClick={toggleSmallScreenAlert}
    >
      &times;
    </button>
    Welcome! This website has not been optimised for small screens so things
    might look a bit quirky!
  </div>
);

export default SmallScreenAlert;

import React from "react";

const PaneHeader = ({ name, color }) => {
  const divRef = "#" + name;
  return (
    <div className="panel-heading" role="tab">
      <a data-toggle="collapse" aria-expanded="false" aria-controls={name}>
        <span
          className="badge sidebar-badge"
          style={{ backgroundColor: color }}
        >
          {" "}
        </span>
        {name}
        <span className="sidebar-dropdown">></span>
      </a>
    </div>
  );
};

export default PaneHeader;

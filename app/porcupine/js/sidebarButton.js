import React from 'react';




const SidebarButton = ({
  active,
  onClick
}) => {
  if (active) {
    return (
      <a className="sidebar-button" onClick={e => {
        e.preventDefault();
        onClick();
      }}>
      </a>
    );
  }
  else {
    return (
      <a className="sidebar-button close" onClick={e => {
        e.preventDefault();
        onClick();
      }}>
      </a>
    );
  }
}

export default SidebarButton;

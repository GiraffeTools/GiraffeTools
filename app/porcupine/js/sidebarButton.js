import React from 'react';


const mapStateToProps = (state) => {
  return {
    showSidebar: state.showSidebar
  };
};

const SidebarButton = ({
  showSidebar,
  onClick
}) => {
  if (showSidebar) {
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
      <a className="sidebar-button" onClick={e => {
        e.preventDefault();
        onClick();
      }}>
      </a>
    );
  }
}

export default SidebarButton;

import React, { Component } from "react";

class WatchOutsideClick extends Component {
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  myRef = React.createRef();

  handleClickOutside = e => {
    if (this.props.isActive && !this.myRef.current.contains(e.target)) {
      this.props.onOutsideClick();
    }
  };

  handleClickInside = () => this.setState({ clickedOutside: false });

  render() {
    return this.props.isActive ? (
      <div
        ref={this.myRef}
        onClick={this.handleClickInside}
        className={this.props.classes}
      >
        {this.props.children}
      </div>
    ) : (
      <div />
    );
  }
}

export default WatchOutsideClick;

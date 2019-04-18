import React, { Component } from "react";

import styles from "../../styles/toolbarItem";

class ToolbarItem extends Component {
  render() {
    if (this.props.item) {
      var { text, items, callback } = this.props.item;
    } else var { text, items, callback } = this.props;
    //pass one object that contains all props ;)

    if (items) {
      const listItems = items.map((item, index) => (
        <a onClick={item.callback} key={index}>
          {item.text}
        </a>
      ));

      var content = (
        <div className="dropdown">
          <a>{text}</a>
          <div className="dropdown-content">{listItems}</div>
        </div>
      );
    } else {
      var content = <a onClick={callback}>{text}</a>;
    }
    return <li>{content}</li>;
  }
}

export default ToolbarItem;

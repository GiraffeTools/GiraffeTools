import React, { Component } from "react";

import ToolbarItem from "./toolbarItem";
import styles from "../../styles/toolbar";

class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleClick(e) {
    e.preventDefault();
    console.log("Single Click");
  }

  render() {
    const { menu, logo, brand, url } = this.props;

    const items =
      menu &&
      menu.map((item, index) => (
        <ToolbarItem
          key={index}
          text={item.text}
          items={item.items}
          callback={this.handleClick}
        />
      ));

    return (
      <div className="minimalist-toolbar">
        <ul>
          <li className="minimalist-toolbar-brand">
            <a href={url}>
              {logo && <img src={logo} className="logo" />}
              {brand}
            </a>
          </li>
          {items}
        </ul>
      </div>
    );
  }
}

export default Toolbar;

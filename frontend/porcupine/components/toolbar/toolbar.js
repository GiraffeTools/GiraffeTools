import React from "react";

import ToolbarItem from "./toolbarItem";

require("../../scss/toolbar.scss");

const Toolbar = props => {
  const { menu, logo, brand, url } = props;

  const items =
    menu &&
    menu.map((item, index) => (
      <ToolbarItem
        key={index}
        text={item.text}
        items={item.items}
        callback={event => event.preventDefault()}
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
};

export default Toolbar;

import React, {Component} from 'react';

const ToolbarItem = (props) => {
  const {text, items, callback} = props;

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

export default ToolbarItem;

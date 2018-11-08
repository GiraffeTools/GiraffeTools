import React from "react";
import { v4 } from "uuid";

import PaneGroup from "./paneGroup";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeElements: null
    };
  }

  componentDidMount() {
    fetch("/api/nodes")
      .then(response => response.json())
      .then(nodeElements => this.setState({ nodeElements }));
  }

  render() {
    const { showSidebar, user, openModal } = this.props;
    const { nodeElements } = this.state;
    return (
      <div>
        <div id="sidebar" className={showSidebar ? " active" : ""}>
          <div id="logo_sidebar">
            <a href="https://giraffe.tools">
              <img
                src={"/static/img/giraffetools_logo_notext.png"}
                className="img-responsive"
                alt="logo"
                id="logo"
              />
            </a>
          </div>
          <div className="col-md-12">
            <div
              className="panel-group"
              id="menu"
              role="tablist"
              aria-multiselectable="true"
            >
              {nodeElements &&
                Object.keys(nodeElements.categories).map(category => {
                  return (
                    <PaneGroup
                      key={category}
                      category={category}
                      nodes={nodeElements.categories[category]}
                    />
                  );
                })}
            </div>
            <h5 className="sidebar-heading">ACTIONS</h5>
            {user &&
              user.user && (
                <a
                  className="btn btn-block extra-buttons text-left"
                  href={`https://github.com/${user.user}/${user.repository}`}
                  target="_blank"
                >
                  <img src="/static/img/gh-icon.png" width={"10%"} />
                  {` ${user.repository}`}
                </a>
              )}
            {
              <a
                className="btn btn-block extra-buttons text-left"
                onClick={() =>
                  openModal({
                    id: v4(),
                    type: "save_to_github",
                    onClose: () => console.log("fire at closing event"),
                    onConfirm: () => console.log("fire at confirming event")
                  })
                }
              >
                <i className="fas fa-save save-button" width={"10%"} />
                <span className="text-black">Save to Github</span>
              </a>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;

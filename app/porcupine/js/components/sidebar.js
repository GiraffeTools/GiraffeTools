import React from "react";
import Radium from "radium";
import { v4 } from "uuid";

import PaneGroup from "./paneGroup";
import styles from "../styles/sidebar";
import { API_HOST } from "../../../giraffe/js/config";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeElements: null
    };
  }

  componentDidMount() {
    fetch(`${API_HOST}/nodes`)
      .then(response => response.json())
      .then(nodeElements => this.setState({ nodeElements }));
  }

  render() {
    const { showSidebar, user, openModal } = this.props;
    const { nodeElements } = this.state;
    return (
      <div>
        <div
          style={[styles.sidebar, showSidebar && styles.sidebar.active]}
          className="customScrollbar"
        >
          <div style={[styles.logoSidebar]}>
            <a href="/">
              <img
                style={[styles.logo]}
                src={"/static/img/giraffetools_logo_notext.png"}
                className="img-responsive"
                alt="logo"
              />
            </a>
          </div>
          <div className="col-md-12">
            <div
              style={[styles.panelGroup]}
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
            <h5 style={[styles.sidebarHeading]}>ACTIONS</h5>
            {user &&
              user.user && (
                <a
                  style={[styles.panelText]}
                  className="btn btn-block"
                  href={`https://github.com/${user.user}/${user.repository}`}
                  target="_blank"
                >
                  <img
                    style={[styles.panelIcon, { width: "10%" }]}
                    src="/static/img/gh-icon.png"
                  />
                  Check out on GitHub
                </a>
              )}
            {
              <a
                style={[styles.panelText]}
                className="btn btn-block text-left"
                onClick={() =>
                  openModal({
                    id: v4(),
                    type: "save_to_github",
                    onClose: () => console.log("fire at closing event"),
                    onConfirm: () => console.log("fire at confirming event")
                  })
                }
              >
                <i
                  style={[styles.panelIcon, { width: "10%" }]}
                  className="fas fa-save"
                />
                Save to GitHub
              </a>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(Sidebar);

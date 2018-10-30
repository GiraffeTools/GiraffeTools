import React from "react";

import PaneGroup from "../components/paneGroup";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: null
    };
  }

  componentDidMount() {
    fetch("/api/nodes")
      .then(response => response.json())
      .then(nodes => this.setState({ nodes }));
  }

  render() {
    const { showSidebar } = this.props;
    const { user, repository, branch } = this.props.user;
    const toggleSidebar = () => {};
    const { nodes } = this.state;
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
              {nodes &&
                Object.keys(nodes.categories).map(category => {
                  return (
                    <PaneGroup
                      key={category}
                      category={category}
                      nodes={nodes.categories[category]}
                    />
                  );
                })}
            </div>
            <h5 className="sidebar-heading">EXTRAS</h5>
            {user && (
              <a
                className="btn btn-block extra-buttons text-left"
                href={`https://github.com/${user}/${repository}`}
                target="_blank"
              >
                <img src="/static/img/gh-icon.png" width={"10%"} />
                {` ${repository}`} on GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;

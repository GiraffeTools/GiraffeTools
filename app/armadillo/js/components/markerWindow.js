import React from "react";
import Radium from "radium";

import Spinner from "./spinner";
import Error from "./error";
import styles from "../styles/markerWindow";


class MarkerWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelIsLoading: true,
      loadingError: false,
      showMenu: true,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount() {
    setTimeout(
      () => this.setState({
        modelIsLoading: false,
        loadingError: true
      }),
      5000
    );
    setTimeout(
      () => this.toggleMenu(),
      3000
    );
  }

  toggleMenu() {
    const { showMenu } = this.state;
    this.setState({
      showMenu: !showMenu
    });
  }

  render() {
    const { modelIsLoading, loadingError, showMenu } = this.state;
    const { image_id } = this.props;

    return (
      <div className="d-flex justify-content-center">
        <div
          style={[styles.markerWindow, !showMenu && styles.markerWindow.closed]}
        >
          <div className="text-center"
            style={[styles.header]}
          >
            <div
              style={[styles.headerContent]}
            >
              <h2><span>AR</span>madillo</h2>
              Print this marker and hold this marker in front of your camera:
            </div>
            <p>
              <a href={`/api/neurovault/${image_id}/qr`} target="_blank">
                <img
                  style={[styles.qrcode]}
                  id="qrcode"
                  className="img-fluid"
                  src={`/api/armadillo/neurovault/${image_id}/qr`}
                />
              </a>
              <br />
              <a
                href={`https://neurovault.org/images/${image_id}`}
                target="_blank"
                style={[styles.neurovaultLabel]}
              >
                {`NeuroVault Image: ${image_id}`}
              </a>
            </p>
            <div>
              <div>
                Fork or star us on GitHub!
              </div>
              <a
                className="github-button"
                href="https://github.com/TimVanMourik/Armadillo"
                data-icon="octicon-star"
                data-size="large"
                data-show-count="true"
                aria-label="Star TimVanMourik/Armadillo on GitHub">
                Star
              </a>
              <a
                className="github-button"
                href="https://github.com/TimVanMourik/Armadillo/fork"
                data-icon="octicon-repo-forked"
                data-size="large"
                data-show-count="true"
                aria-label="Fork TimVanMourik/Armadillo on GitHub">
                Fork
              </a>
            </div>
          </div>
          <div
            style={[styles.markerButton, !showMenu && styles.markerButton.closed]}
          >
            <button
              type="button"
              className="btn btn-primary btn-pill"
              style={[styles.closeMarkerButton]}
              aria-label="Close" onClick={() => this.toggleMenu()}
            >
              <i
                className="fa fa-angle-left"
                aria-hidden="true" />
            </button>
          </div>
          <Spinner isLoading={modelIsLoading} />
          <Error error={!modelIsLoading && loadingError} />
        </div>
      </div>
    )
  }
}

export default Radium(MarkerWindow);

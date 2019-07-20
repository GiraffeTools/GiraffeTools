import React from 'react';
import Radium from 'radium';

import GithubIcon from '../../porcupine/components/sidebar/githubIcon';
import Spinner from './spinner';
import Error from './error';
import styles from '../styles/markerWindow';

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
        () =>
          this.setState({
            modelIsLoading: false,
            loadingError: true,
          }),
        5000
    );
    setTimeout(() => this.toggleMenu(), 3000);
  }

  toggleMenu() {
    const {showMenu} = this.state;
    this.setState({
      showMenu: !showMenu,
    });
  }

  render() {
    const {modelIsLoading, loadingError, showMenu} = this.state;
    const {imageId, user, repository} = this.props;

    return (
      <div className="d-flex justify-content-center">
        <div
          style={[styles.markerWindow, !showMenu && styles.markerWindow.closed]}
        >
          <div className="text-center" style={[styles.header]}>
            <div style={[styles.headerContent]}>
              <h2 style={[styles.headline]}>
                <span style={[styles.headlineAR]}>AR</span>
                madillo
              </h2>
              Print this marker and hold this marker in front of your camera:
            </div>
            <p>
              <a
                href={`/api/armadillo/neurovault/${imageId}/qr`}
                target="_blank"
              >
                <img
                  style={[styles.qrcode]}
                  className="img-fluid"
                  src={`/api/armadillo/neurovault/${imageId}/qr`}
                />
              </a>
              <a
                href={`https://neurovault.org/images/${imageId}`}
                target="_blank"
                style={[styles.neurovaultLabel]}
              >
                {`NeuroVault Image: ${imageId}`}
              </a>
            </p>
            <div style={[styles.footer]}>
              <div>Fork or star us on GitHub!</div>
              <GithubIcon type="fork" user={user} repo={repository} />
              <GithubIcon type="star" user={user} repo={repository} />
            </div>
          </div>
          <div
            style={[
              styles.markerButton,
              !showMenu && styles.markerButton.closed,
            ]}
          >
            <button
              type="button"
              className="btn btn-primary btn-pill"
              style={[styles.closeMarkerButton]}
              aria-label="Close"
              onClick={() => this.toggleMenu()}
            >
              <i className="fa fa-angle-left" aria-hidden="true" />
            </button>
          </div>
          <Spinner isLoading={modelIsLoading} />
          <Error error={!modelIsLoading && loadingError} />
        </div>
      </div>
    );
  }
}

export default Radium(MarkerWindow);

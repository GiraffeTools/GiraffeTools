import React from "react";

// function imageExists(image_url){
//   var http = new XMLHttpRequest();
//   http.open('HEAD', image_url, false);
//   http.send();
//   return (http.status != 404 && http.status != 500);
// }
// function loadingAlert() {
//   /*alert("Error while loading 3d brain model from neurovault :( Sorry!");*/
//   $(".errormsg").animate({"opacity": "1"}, 700);
// }
// function loadAfterTime() {
//   if (imageExists("/api/neurovault/64604/models/left") === false) {
//     loadingAlert();
//   }
// }
//  window.onload = function(){
//   setTimeout(loadAfterTime, 5000)
// };

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
      <div>
        <div className={"marker-window" + (showMenu ? "" : " marker-window-closed")}>
          <div className="card text-center">
            <div className="card-header">
              <h2><span>AR</span>madillo</h2>
              Print this marker and hold this marker in front of your camera:
            </div>
            <p>
              <a href={`/api/neurovault/${image_id}/qr`} target="_blank">
                <img id="qrcode" className="img-fluid" src={`/api/armadillo/neurovault/${image_id}/qr`}/>
              </a>
              <br />
              <small><a href={`https://neurovault.org/images/${image_id}`} target="_blank">NeuroVault Image</a></small>
            </p>
            <div>
              <div>
                Fork or star us on GitHub!
              </div>
              <a className="github-button" href="https://github.com/TimVanMourik/Armadillo" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star TimVanMourik/Armadillo on GitHub">
                Star
              </a>
              <a className="github-button" href="https://github.com/TimVanMourik/Armadillo/fork" data-icon="octicon-repo-forked" data-size="large" data-show-count="true" aria-label="Fork TimVanMourik/Armadillo on GitHub">
                Fork
              </a>
            </div>
          </div>
          <div className={"marker-button" + (showMenu ? "" : " marker-button-closed")}>
            <button type="button" className="btn btn-primary btn-pill close-marker-button"
              aria-label="Close" onClick={() => this.toggleMenu()}
            >
              <i className="fa fa-angle-left" aria-hidden="true"></i>
            </button>
          </div>
          {
            modelIsLoading && <div className="spinner" />
          }
          {
            !modelIsLoading && loadingError && <div className="errormsg">
              Some ERROR occured while loading 3D brain model from neurovault :( Sorry!
            </div>
          }
        </div>
      </div>
    )
  }
}


export default MarkerWindow;

import React from "react";


class Content extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

    return (
      <div>
        <div class="container-fluid base">
          <div class="col text-center">
            <h1>Giraffe</h1>
            <h4 class="">Graphical Interface for Reproducible Analysis For workFlow Experiments</h4>
            Giraffe tools are applications that make it easier to analyse all kinds of data!
          </div>
          <div>
          </div>
        </div>

        <div class="container-fluid mt-3 ">
          <div class="col text-center">
            <h1>Porcupine</h1>
            <h4 class="">PORcupine Creates Ur PipelINE</h4>
            With Porcupine, you can visually build your pipeline!
          </div>
          <div class="col text-center">
            <a class="btn btn-lg btn-warning" role="button" href="{% url "/porcupine" %}">Get started!</a>
          </div>
        </div>

        <div class="container-fluid mt-3 ">
          <div class="col text-center">
            <h1>Armadillo</h1>
            <h4 class="">Augmented Reality [madillo]</h4>
            Augmented Reality brain images!
          </div>
          <div class="col text-center">
            <a class="btn btn-lg btn-warning" role="button" href="https://armadillo-brain.herokuapp.com">Get started!</a>
          </div>
        </div>

        <div class="container right">
          <h3>All contributors</h3>
            <div class="card mb-12 text-center">
              <div id="contributors">
            </div>
          </div>
        </div>

        <br />

        <div class="container fluid mt-3">
          <div class="col text-center">
            <a href="https://github.com/TimVanMourik/GiraffeTools" target="_blank">
              <img src="{% static 'img/gh-icon.png' %}" width="4%"/>
            </a>
            <h6>2018</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;

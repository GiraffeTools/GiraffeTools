import React, { Fragment } from "react";

const GalleryExample = ({ example }) => (
  <div className="column col-5" id="example-card">
    <img src="/static/img/armadillo_card.jpg" className="card-image" />
    <h3>{example.title}</h3>
    <img src="/static/img/separator_red.svg" />
    <br />
    {example.description}
    <br />
    <a type="button btn-primary" className="btn giraffe-button">
      Discover
    </a>
  </div>
);

class GalleryElements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      examples: null
    };
  }

  componentDidMount() {
    fetch("/api/example_repos")
      .then(response => response.json())
      .then(examples => this.setState({ examples }));
  }

  render() {
    const { examples } = this.state;

    return (
      <div id="gallery-box" className="row">
        {examples &&
          examples.map(example => (
            <GalleryExample key={example.id} example={example} />
          ))}
      </div>
    );
  }
}

export default GalleryElements;

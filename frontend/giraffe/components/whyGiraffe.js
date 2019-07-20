import React from 'react';
import Radium from 'radium';
import Container from 'react-bootstrap/Container';

import styles from '../styles/whyGiraffe.js';

const Description = ({description}) => {
  const divStyle = {
    left: description.position[0],
    top: description.position[1],
    textAlign: description.textAlign,
  };
  return (
    <h3 className="position-absolute" style={divStyle}>
      {description.description}
    </h3>
  );
};

const WhyGiraffe = () => {
  const descriptions = [
    {
      id: 1,
      description: 'it\'s really great',
      position: ['69%', '11%'],
      textAlign: 'left',
    },
    {
      id: 2,
      description: 'so much wow',
      position: ['82%', '32%'],
      textAlign: 'left',
    },
    {
      id: 3,
      description: 'it\'s really great',
      position: ['9%', '28%'],
      textAlign: 'right',
    },
    {
      id: 4,
      description: 'so much wow',
      position: ['1%', '49%'],
      textAlign: 'right',
    },
    {
      id: 5,
      description: 'it\'s really great',
      position: ['10%', '84%'],
      textAlign: 'right',
    },
    {
      id: 6,
      description: 'it\'s really great',
      position: ['74%', '57%'],
      textAlign: 'left',
    },
  ];

  return (
    <Container fluid={true} style={styles.whyGiraffe}>
      <h2 style={[styles.whyGiraffeHeading]}>WHY GIRAFFE</h2>
      <div className="position-relative">
        <div id="justify-content-center" style={[styles.whyGiraffeBox]}>
          <svg style={[styles.giraffeImage]}>
            <g fill="#FCF0D6">
              <circle cx="50%" cy="50%" r="30%" />
            </g>
          </svg>
          <img
            src="/static/img/giraffe_tooltips.png"
            style={[styles.whyGiraffeImage]}
            className="position-relative"
          />
          {descriptions &&
            descriptions.map((description) => (
              <Description key={description.id} description={description} />
            ))}
        </div>
        <img src="/static/img/giraffe-lines.svg" style={[styles.peopleLines]} />
      </div>
    </Container>
  );
};

export default Radium(WhyGiraffe);

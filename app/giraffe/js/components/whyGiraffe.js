import React from "react";

const Description = ({ description }) => {
  const divStyle = {
    position: "absolute",
    left: description.position[0],
    top: description.position[1],
    textAlign: description.textAlign
  };
  return <h3 style={divStyle}>{description.description}</h3>;
};

const WhyGiraffe = () => {
  const descriptions = [
    {
      id: 1,
      description: "it's really great",
      position: ["69%", "11%"],
      textAlign: "left"
    },
    {
      id: 2,
      description: "so much wow",
      position: ["82%", "32%"],
      textAlign: "left"
    },
    {
      id: 3,
      description: "it's really great",
      position: ["9%", "28%"],
      textAlign: "right"
    },
    {
      id: 4,
      description: "so much wow",
      position: ["1%", "49%"],
      textAlign: "right"
    },
    {
      id: 5,
      description: "it's really great",
      position: ["10%", "84%"],
      textAlign: "right"
    },
    {
      id: 6,
      description: "it's really great",
      position: ["74%", "57%"],
      textAlign: "left"
    }
  ];

  return (
    <div className="container-fluid" id="why-giraffe">
      <h2 className="with-lines flip-background">WHY GIRAFFE</h2>
      <div className="position-relative">
        <div id="why-giraffe-box justify-content-center">
          {/*
          <svg id="giraffe-image" >
            <g fill="#FCF0D6">
              <circle cx="50%" cy="50%" r="20%"></circle>
            </g>
          </svg>
          */}
          <img
            src="/static/img/giraffe_tooltips.png"
            id="why-giraffe-image"
            className="position-relative"
          />
          {descriptions &&
            descriptions.map(description => (
              <Description key={description.id} description={description} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default WhyGiraffe;

import React from "react";

const Description = ({ description }) => {
  const divStyle = {
    position: "absolute",
    left: description.position[0],
    top: description.position[1]
  };
  return <h3 style={divStyle}>{description.description}</h3>;
};

const WhyGiraffe = () => {
  const descriptions = [
    {
      id: 1,
      description: "it's really great",
      position: ["67%", "4%"]
    },
    {
      id: 2,
      description: "so much wow",
      position: ["78%", "31%"]
    },
    {
      id: 3,
      description: "it's really great",
      position: ["18%", "26%"]
    },
    {
      id: 4,
      description: "so much wow",
      position: ["10%", "52%"]
    },
    {
      id: 5,
      description: "it's really great",
      position: ["19%", "97%"]
    },
    {
      id: 6,
      description: "it's really great",
      position: ["72%", "63%"]
    }
  ];

  return (
    <div className="container-fluid" id="why-giraffe">
      <h2 className="with-lines">WHY GIRAFFE</h2>
      {/*
      <svg id="giraffe-image" >
        <g fill="#FCF0D6">
          <circle cx="50%" cy="50%" r="20%"></circle>
        </g>
      </svg>
      */}
      <img src="/static/img/giraffe_tooltips.png" id="why-giraffe-image" />
      {descriptions &&
        descriptions.map(description => (
          <Description key={description.id} description={description} />
        ))}
    </div>
  );
};

export default WhyGiraffe;

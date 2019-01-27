import React from "react";

const MenuGoo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    style={{ height: "0px" }}
  >
    <defs>
      <filter id="shadowed-goo">
        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
          result="goo"
        />
        <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
        <feColorMatrix
          in="shadow"
          mode="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
          result="shadow"
        />
        <feOffset in="shadow" dx="1" dy="1" result="shadow" />
        <feBlend in2="shadow" in="goo" result="goo" />
        <feBlend in2="goo" in="SourceGraphic" result="mix" />
      </filter>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
          result="goo"
        />
        <feBlend in2="goo" in="SourceGraphic" result="mix" />
      </filter>
    </defs>
  </svg>
);
export default MenuGoo;

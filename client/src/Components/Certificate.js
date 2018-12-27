import React from "react";
import PropTypes from "prop-types";

function Certificate(props) {
  const { title, name, date, hash, logo } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1000"
      height="700"
      id="certificate"
    >
      <rect
        x="50"
        y="25"
        rx="20"
        ry="20"
        width="900"
        height="600"
        id="border"
      />
      <text x="500" y="100" text-anchor="middle" fill="black" id="bodyTitle">
        Certificate
      </text>
      <text x="500" y="125" text-anchor="middle" fill="black" id="bodySubTitle">
        of
      </text>
      <line x1="250" y1="260" x2="750" y2="260" id="titleUnderLine" />
      <text x="500" y="250" text-anchor="middle" fill="black" id="title">
        {title}
      </text>
      <text
        x="500"
        y="300"
        text-anchor="middle"
        fill="black"
        id="subTitleHeader"
      >
        awarded to
      </text>
      <text x="500" y="400" text-anchor="middle" fill="black" id="name">
        {name}
      </text>
      <line x1="200" y1="410" x2="800" y2="410" id="titleUnderLine" />
      <text x="500" y="440" text-anchor="middle" fill="black" id="bodySubTitle">
        on
      </text>
      <text x="500" y="500" text-anchor="middle" fill="black" id="date">
        {date}
      </text>
      <line x1="400" y1="510" x2="600" y2="510" id="titleUnderLine" />
      <text x="100" y="575" text-anchor="start" fill="black" id="hash">
        ID: {hash}
      </text>
      <image
        x="725"
        y="500"
        height="80px"
        width="120px"
        id="logo"
        href={logo}
      />
      Sorry, your browser does not support inline SVG.
    </svg>
  );
}

Certificate.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
}

export default Certificate;

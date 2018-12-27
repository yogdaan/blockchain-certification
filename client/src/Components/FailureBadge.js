import React from "react";
// import "../Styles/badgeAnimation.css";

function FailureBadge(props) {
  return (
    <div className={`o-circle c-container__circle o-circle__sign--failure`}>
      <div className="o-circle__sign" />
    </div>
  );
}

export default FailureBadge;

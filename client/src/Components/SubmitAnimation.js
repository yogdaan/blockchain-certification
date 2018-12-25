import React from "react";
import "../styles/submitAnimation.css";

function SubmitAnimation(props) {
  const { currentState } = props;
  return (
    <div className="container">
      <button className={`animatedButton ${currentState}`} />
    </div>
  );
}

export default SubmitAnimation;

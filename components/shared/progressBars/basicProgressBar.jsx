import React from "react";

const ProgressBar = ({ percentage, color }) => {
  return (
    <div className={`w-[200px] h-7 border border-${color} rounded`}>
      <div
        style={{ width: percentage * 2 }}
        className={`h-full bg-${color}  rounded`}
      ></div>
    </div>
  );
};

export default ProgressBar;

import React from 'react';

const Designations = (data) => {
  const side = window.innerWidth / 128;
  return (
    <g transform={`translate(${data.x}, ${data.y})`}>
      <rect
        x="0"
        y="0"
        width={ side }
        height={ side }
        fill={`url(#${data.color})`}
      />
      <text
        x={ 1.5 * side }
        y={ side }
        fill={ data.textColor }
        fontSize={ window.innerWidth / 110 }
        fontFamily="PTSans"
      >{data.text}</text>
    </g>
  );
};

export default Designations;

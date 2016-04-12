import React from 'react';
export default () => {
  const height = window.innerWidth / 68.6;
  const translateString = `translate(0, ${- height})`;
  return (
    <svg
      width="100%"
      height={ height }
    >
      <g transform={ translateString }>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          className="block"
        />
      </g>
      <linearGradient
        id="blockGradient"
        x1="0%" y1="0%" x2="0%" y2="100%"
      >
        <stop offset="0%" stopColor="#0b0a0a" stopOpacity="0" />
        <stop offset="100%" stopColor="#2fc6f4" />
      </linearGradient>
    </svg>
  );
};

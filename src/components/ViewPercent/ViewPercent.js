import React, { PropTypes } from 'react';
const { number, string } = PropTypes;

const ViewPercent = (props) => {
  const { percent, x, y, color } = props;
  const screenWidth = window.innerWidth;
  const koef = percent.toString().length;
  const bigFont = screenWidth / 53.3;
  const smallFont = screenWidth / 106.7;
  const offset = (smallFont * koef) / 4;
  const persentX = x + offset * 2;
  return (
    <g>
      <text
        x={ x - offset }
        y={ y }
        fontSize={ bigFont }
        fontFamily="modeka"
        fill={ color }
        style={{ textAnchor: 'middle' }}
      >
        { percent }
      </text>
      <text
        x={ persentX }
        y={ y - screenWidth / 140 }
        fontSize={ smallFont }
        fontFamily="modeka"
        fill={ color }
        style={{ textAnchor: 'middle' }}
      >%</text>
    </g>
  );
};

ViewPercent.propTypes = {
  percent: number,
  color: string,
  x: number,
  y: number,
};

export default ViewPercent;

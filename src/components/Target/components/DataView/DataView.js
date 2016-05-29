import React from 'react';

const DataView = (data) => {
  const suspicious = data.total - data.blocked;
  const suspiciousPercent = suspicious / data.maxDomain;
  const blockedPercent = data.blocked / data.maxDomain;
  const width = window.innerWidth / 5.25;
  const rectH = window.innerWidth / 384;
  const lineH = window.innerWidth / 48;
  const startLine = window.innerWidth / 174.5;
  const size = window.innerWidth / 136.6;
  const offsetToText = window.innerWidth / 70;
  return (
    <svg width={ window.innerWidth / 4.55 } height={ window.innerWidth / 22.77 }>
      <g transform={`translate(0,${window.innerWidth / 64})`}>
        <text
          x="0"
          y="0"
          fill="white"
          fontSize={ size }
          fontFamily="PTSans"
        >
          {data.name} - {data.total} Total
        </text>
        <rect
          x="1"
          y={ startLine + lineH * 0.25 }
          width={ blockedPercent * width }
          height={ rectH }
          fill="url(#blockedGradient)"
        />
        <text
          x={ blockedPercent * width + 10}
          y={ offsetToText }
          fill="white"
          fontSize={ size }
          fontFamily="PTSans"
        >
          { data.blocked }
        </text>
        <rect
          x="1"
          y={ startLine + lineH * 0.6 }
          width={ suspiciousPercent * width }
          height={ rectH }
          fill="url(#suspiciousGradient)"
        />
        <text
          x={ suspiciousPercent * width + 10}
          y={ offsetToText + lineH * 0.35 }
          fill="white"
          fontSize={ size }
          fontFamily="PTSans"
        >
          { suspicious }
        </text>
        <line
          x1="0"
          y1={ startLine }
          x2="0"
          y2={ startLine + lineH }
          stroke="white"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};

export default DataView;

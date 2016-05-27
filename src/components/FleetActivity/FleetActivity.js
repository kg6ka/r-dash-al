import React, { Component } from 'react';
import expand from './images/expand.svg';
import { Charts, Designations } from './components';

export default class FleetActivity extends Component {
  render() {
    let width = window.innerWidth / 1.79;
    if (!this.props.alertChange) {
      width = width * 1.2;
    }
    const height = window.innerWidth / 5.45;
    const pictureSide = window.innerWidth / 96;
    const offset = window.innerWidth / 21.3;
    return (
      <div className="fleetActivityBlock">
        <svg
          className="fleet"
          width={ width }
          height={ height }
        >
          <text
            className="glowText"
            x={ window.innerWidth / 96 }
            y={ window.innerWidth / 54.6 }
            fill={'#2fc6f4'}
            fontSize={ window.innerWidth / 120 }
          >
            FLEET ACTIVITY
          </text>
          <Designations
            x={offset}
            y={offset - window.innerWidth / 64}
            color="suspiciousGradient"
            textColor="white"
            text="Suspicious"
          />
          <Designations
            x={window.innerWidth / 8.53}
            y={offset - window.innerWidth / 64}
            color="blockedGradient"
            textColor="white"
            text="Blocked"
          />
          <text
            x={ width - window.innerWidth / 6.4 }
            y={ offset - window.innerWidth / 128 }
            fill="white"
            fontSize={ window.innerWidth / 110 }
            fontFamily="PTSans"
          >Transmitting Vehicles</text>
          <rect
            x={ width - offset - window.innerWidth / 128 }
            y={ offset - window.innerWidth / 64 }
            width={ window.innerWidth / 128 }
            height={ window.innerWidth / 128 }
            fill="url(#transmittingGradient)"
          />
          <line
            x1={ offset }
            y1={ offset }
            x2={ width - offset }
            y2={ offset }
            stroke="#535353"
            strokeWidth="1"
          ></line>
          <image
            x={ width - pictureSide * 2 }
            y={ pictureSide }
            xlinkHref={ expand }
            width={ pictureSide }
            height={ pictureSide }
          />
          <Charts
            repaint={ this.props.alertChange }
            data={ this.props.data }
            registered={ this.props.registered }
            color1={'suspiciousGradient'}
            color2={'blockedGradient'}
            color3={'transmittingGradient'}
          />
          <linearGradient
            id="suspiciousGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#ffc90d" />
            <stop offset="100%" stopColor="#ef7a24" />
          </linearGradient>
          <linearGradient
            id="blockedGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#a60e14" />
            <stop offset="100%" stopColor="#8f000a" />
          </linearGradient>
          <linearGradient
            id="transmittingGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#00789c" />
            <stop offset="34%" stopColor="#1092ba" />
            <stop offset="100%" stopColor="#2fc6f4" />
          </linearGradient>
          </svg>
        </div>
      );
  }
};

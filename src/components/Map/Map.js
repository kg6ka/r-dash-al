import React, { Component, PropTypes } from 'react';
const { array } = PropTypes;
import styles from './Map.scss';

const mapStyle = [
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [
      { saturation: 36 },
      { color: '#000000' },
      { lightness: 40 },
    ],
  }, {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [
      { visibility: 'on' },
      { color: '#000000' },
      { lightness: 16 },
    ],
  }, {
    featureType: 'all',
    elementType: 'labels.icon',
    stylers: [
      { visibility: 'off' },
    ],
  }, {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [
      { color: '#000000' },
      { lightness: 20 },
    ],
  }, {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      { color: '#000000' },
      { lightness: 17 },
      { weight: 1.2 },
    ],
  }, {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      { color: '#000000' },
      { lightness: 20 },
    ],
  }, {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      { color: '#000000' },
      { lightness: 21 },
    ],
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      { color: '#000000' },
      { lightness: 17 },
    ],
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      { color: '#000000' },
      { lightness: 29 },
      { weight: 0.2 },
    ],
  }, {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      { color: '#000000' },
      { lightness: 18 },
    ],
  }, {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [
      { color: '#000000' },
      { lightness: 16 },
    ],
  }, {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      { color: '#000000' },
      { lightness: 19 },
    ],
  }, {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      { color: '#000000' },
      { lightness: 17 },
    ],
  },
];

export default class Map extends Component {
  static propTypes = {
    locations: array,
  };

  componentWillReceiveProps(props) {
    if (props.locations && props.locations.length !== this.props.locations.length && props.lng) {
      const locations = props.locations;
      let max = 0;
      let i = locations.length;
      while (i--) {
        if (locations[i].count > max) {
          max = locations[i].count;
        }
      }

      const CountColor = 100;
      let step = CountColor;
      if (max < 1000) { max = 1000; }
      if (max < 100) { max = 100; }
      if (max <= 20) { max = 20; }

      step = CountColor / max;
      const colorFun = (value) => `rgb(180, ${100-parseInt(value * step)}, 4)`;
      const map = new GMaps({
        el: '#map',
        lat: props.lat,
        lng: props.lng,
        zoom: 2,
        disableDefaultUI: true,
      });

      map.setOptions({ styles: mapStyle });
      // Adding a marker to the location we are showing
      locations.map(value => {
        const marker = {
          lat: value.lat,
          lng: value.lng,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 3,
            fillColor: colorFun((value.count >= 0) ? value.count : 0),
            strokeColor: colorFun((value.count >= 0) ? value.count : 0),
            strokeWeight: 6,
          },
          infoWindow: {
            content: `<div style="font-family: PTSans;">
              <span>${value.desc}</span>
              <span style="color: gray";> | </span>
              <span style="color: #93030C;">${value.count}</span>
            </div>`,
          },
        };
        return map.addMarker(marker);
      });
    }
  }

  render() {
    return (
    <div className={styles.mapHolder}>
      <div className={styles.heatmapHeader}>
      <span>HEATMAP</span>
      <span className={styles.heatmapHeaderLine}> | </span>
      <span>{ this.props.desc }</span>
        </div>
      <p>Loading...</p>
      <div className={styles.map} id="map"></div>
    </div>
    );
  }
}

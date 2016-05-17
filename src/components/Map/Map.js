import React, { Component, PropTypes } from 'react';
const { array } = PropTypes;
import styles from './Map.scss';

export default class Map extends Component {
  static propTypes = {
    locations: array,
  };

  componentWillReceiveProps(props) {
    if (props.locations && props.locations.length !== this.props.locations.length && props.lng) {
      const locations = props.locations;
      const mapStyle = [
        {
          featureType: 'all',
          elementType: 'labels.text.fill',
          stylers: [
            {saturation: 36},
            {color: '#000000'},
            {lightness: 40},
          ],
        }, {
          featureType: 'all',
          elementType: 'labels.text.stroke',
          stylers: [
            {visibility: 'on'},
            {color: '#000000'},
            {lightness: 16},
          ],
        }, {
          featureType: 'all',
          elementType: 'labels.icon',
          stylers: [
            {visibility: 'off'},
          ],
        }, {
          featureType: 'administrative',
          elementType: 'geometry.fill',
          stylers: [
            {color: '#000000'},
            {lightness: 20},
          ],
        }, {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [
            {color: '#000000'},
            {lightness: 17},
            {weight: 1.2},
          ],
        }, {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [
            {color: '#000000'},
            {lightness: 20},
          ],
        }, {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [
            {color: '#000000'},
            {lightness: 21},
          ],
        }, {
          featureType: 'road.highway',
          elementType: 'geometry.fill',
          stylers: [
            {color: '#000000'},
            {lightness: 17},
          ],
        }, {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [
            {color: '#000000'},
            {lightness: 29},
            {weight: 0.2},
          ],
        }, {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [
            {color: '#000000'},
            {lightness: 18},
          ],
        }, {
          featureType: 'road.local',
          elementType: 'geometry',
          stylers: [
            {color: '#000000'},
            {lightness: 16},
          ],
        }, {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [
            {color: '#000000'},
            {lightness: 19},
          ],
        }, {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {color: '#000000'},
            {lightness: 17},
          ],
        },
      ];

      const map = new GMaps({
        el: '#map',
        lat: locations[0].lat,
        lng: locations[0].lng,
        zoom: 2,
        disableDefaultUI: true,
      });

      map.setOptions({styles: mapStyle});

      // Adding a marker to the location we are showing
      locations.map(value =>
        map.addMarker({
          lat: value.lat,
          lng: value.lng,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 3,
            fillColor: value.count > 6 ? '#fba120' : '#B40404',
            strokeWeight: 6,
            strokeColor: value.count > 6 ? '#fba120' : '#B40404',
          },
        }));
    }
  }

  render() {
    return (
    <div className={styles.mapHolder}>
      <p>Loading...</p>
      <div className={styles.map} id="map"></div>
    </div>
    );
  }
}

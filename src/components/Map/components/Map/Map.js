// var React = require('react');
// import styles from './Map.scss';
// var Map = React.createClass({
//
//     componentDidMount(){
//
//         // Only componentDidMount is called when the component is first added to
//         // the page. This is why we are calling the following method manually.
//         // This makes sure that our map initialization code is run the first time.
//
//         this.componentDidUpdate();
//     },
//
//     componentDidUpdate(){
//
//         if(this.lastLat == this.props.lat && this.lastLng == this.props.lng){
//
//             // The map has already been initialized at this address.
//             // Return from this method so that we don't reinitialize it
//             // (and cause it to flicker).
//
//             return;
//         }
//
//         this.lastLat = this.props.lat;
//         this.lastLng = this.props.lng
//
//         var map = new GMaps({
//             el: '#map',
//             lat: this.props.lat,
//             lng: this.props.lng
//         });
//
//         // Adding a marker to the location we are showing
//
//         map.addMarker({
//             lat: this.props.lat,
//             lng: this.props.lng
//         });
//     },
//
//     render(){
//
//         return (
//             <div className={styles.mapHolder}>
//                 <p>Loading...</p>
//                 <div className={styles.map} id="map"></div>
//             </div>
//         );
//     }
//
// });
//
// module.exports = Map;


import React, { PropTypes, Component } from 'react'
import styles from '../../Map.scss'



class Map extends Component {
    componentWillMount() {
        this.props.fetchLocations();
    }
    componentDidMount(){
        this.componentDidUpdate();
    }

    componentDidUpdate(){
        const locations = this.props.locations;

        // if(this.lastLat == locations.lat && this.lastLng == locations.lng){
        //
        //     // The map has already been initialized at this address.
        //     // Return from this method so that we don't reinitialize it
        //     // (and cause it to flicker).
        //
        //     return;
        // }

        // this.lastLat = locations.lat;
        // this.lastLng = locations.lng;
        var styles = [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    }
                ]
            }
        ]




        var map = new GMaps({
            el: '#map',
            lat: locations[0].lat,
            lng: locations[0].lng,
            zoom: 2
        });
        map.setOptions({styles: styles});

        // Adding a marker to the location we are showing
        locations.forEach(function (value) {
            map.addMarker({
                lat: value.lat,
                lng: value.lng,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 3,
                    fillColor: value.count > 6 ? '#fba120' : "#B40404",
                    strokeWeight:6,
                    strokeColor: value.count > 6 ? '#fba120' : "#B40404"
                }
            });
        });

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


export default Map;
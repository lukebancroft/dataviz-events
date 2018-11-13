import React from 'react';
//import france from '../france.json';

export default class CloudGraph extends React.Component {
  // Tooltip on hover for dept and region name + stats
  // Darker colour for higher event frequency per department
  // Bubbles for event density
  // Zoom on map

  componentDidMount() {

    this.drawMap();
  }
  render() {
    return (
        <div id="leafletMap">
        </div>
    );
  }

  drawMap() {
    var mymap = window.L.map('leafletMap').setView([51.505, -0.09], 13);

    window.L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
  }
}
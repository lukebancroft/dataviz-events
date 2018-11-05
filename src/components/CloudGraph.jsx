import React from 'react';
import france from '../france.json';

export default class CloudGraph extends React.Component {

  render() {
    this.drawFrance();
    return (
        <div id="cloudGraph">
        </div>
    );
  }

  drawFrance() {
    //Width and height
    var width = 800;
    var height = 1250;

    var canvas = window.d3.select("#cloudGraph").append("svg")
      .attr("width", width)
      .attr("height", height)

      var group = canvas.selectAll("g")
        .data(france.features)
        .enter()
        .append("g")

      //Define map projection
      var projection = window.d3.geoMercator().fitSize([width, height], france);

      //Define path generator
      var path = window.d3.geoPath()
        .projection(projection);

      var areas = group.append("path")
        .attr("d", path)
        .attr("class", "area")
        .attr("fill", "steelblue");

      
        canvas.selectAll("circle")
          .data(this.props.locations)
          .enter()
          .append("circle")
          .attr("cx", function(d) {
            console.log(d);
            if (d) {
            return projection([d[1], d[0]])[0];
            } else {
              return 0;
            }
          })
          .attr("cy", function(d) {
            if (d) {
              return projection([d[1], d[0]])[1];
              } else {
                return 0;
              }
          })
          .attr("r", 5)
          .style("fill", "yellow")
          .style("opacity", 0.75);
  }
}
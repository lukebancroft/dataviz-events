import React from 'react';
import france from '../france.json';

export default class PointMap extends React.Component {
  // Darker colour for higher event frequency per department
  // Bubbles for event density

  componentDidMount() {
    this.drawFrance();
  }

  render() {
    return (
        <div id="pointMap">
        </div>
    );
  }
  
  drawFrance() {
    //Width and height
    var width = 650;
    var height = 500;

    var zoom = window.d3.zoom()
      .scaleExtent([1 / 2, 4])
      .on("zoom", zoomed);

    var canvas = window.d3.select("#pointMap").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("align","center")
      .call(zoom);

    var div = window.d3.select("body").append("div")   
      .attr("class", "tooltip")               
      .style("opacity", 0);

      var group = canvas.selectAll("g")
        .data(france.features)
        .enter()
        .append("g")
        .on("mouseover", function(d) {
            div.transition()        
                .duration(200)
                .style("opacity", .9);      
            div.html("Département : " + d.properties.NOM_DEPT + "<br/>"
            +  "Région : " + d.properties.NOM_REGION)
                .style("left", (window.d3.event.pageX + 30) + "px")     
                .style("top", (window.d3.event.pageY - 30) + "px")
        })
        .on("mouseout", function(d) {
            div.style("opacity", 0);
            div.html("")
                .style("left", "-500px")
                .style("top", "-500px");
        });

      //Define map projection
      var projection = window.d3.geoMercator().fitSize([width, height], france);

      //Define path generator
      var path = window.d3.geoPath()
        .projection(projection);

      group.append("path")
        .attr("d", path)
        .attr("class", "area")
        .attr("fill", "steelblue");

      
      var circles = canvas.selectAll("circle")
          .data(this.props.locations)
          .enter()
          .append("circle")
          .attr("cx", function(d) {
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
          .attr("r", 2)
          .style("fill", "yellow")
          .style("opacity", 0.75);

          function zoomed(){
            group.attr("transform", window.d3.event.transform);
            circles.attr("transform", window.d3.event.transform);
          }
  }
}
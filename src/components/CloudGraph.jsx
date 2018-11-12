import React from 'react';
import france from '../france.json';

export default class CloudGraph extends React.Component {
  // Tooltip on hover for dept and region name + stats
  // Darker colour for higher event frequency per department
  // Bubbles for event density
  // Zoom on map
  render() {
    this.drawFrance();
    return (
        <div id="cloudGraph" style={{width: "850px", height: "600px", overflow: "hidden", border: "1px"}}>
        </div>
    );
  }

  
  drawFrance() {
    //Width and height
    var width = 850;
    var height = 600;

    var zoom = window.d3.zoom()
      .scaleExtent([1 / 2, 4])
      .on("zoom", zoomed);

    var canvas = window.d3.select("#cloudGraph").append("svg")
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

      var areas = group.append("path")
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
          .call(zoom)
          .style("fill", "yellow")
          .style("opacity", 0.75);

          function zoomed(){
            group.attr("transform", window.d3.event.transform);
            circles.attr("transform", window.d3.event.transform);
          }
  }
}
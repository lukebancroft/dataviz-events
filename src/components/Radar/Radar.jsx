import React from 'react';
import * as d3 from "d3";
import {RadarChart} from './radarChart.js'

export default class Radar extends React.Component {

  componentDidMount() {
    this.drawRadar();
  }

  componentDidUpdate() {
    this.drawRadar();
  }

  render() {
    return (
        <div className="radarChart">
        </div>
    );
  }

  drawRadar() { 

    document.getElementsByClassName("radarChart")[0].innerHTML = "";
      /* Radar chart design  */
      
			////////////////////////////////////////////////////////////// 
			//////////////////////// Set-Up ////////////////////////////// 
			////////////////////////////////////////////////////////////// 
			var margin = {top: 100, right: 100, bottom: 100, left: 100},
            width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
            height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
                
        ////////////////////////////////////////////////////////////// 
        ////////////////////////// Data ////////////////////////////// 
        ////////////////////////////////////////////////////////////// 
        var data = [];
        data.push(this.traitement("Paris"));
        data.push(this.traitement("Lyon"));
        data.push(this.traitement("Marseille"));
        data.push(this.traitement("Toulouse"));
        data.push(this.traitement("Nantes"));

        console.log(data);

        ////////////////////////////////////////////////////////////// 
        //////////////////// Draw the Chart ////////////////////////// 
        ////////////////////////////////////////////////////////////// 
        var color = d3.scaleOrdinal()
            .range(["#EDC951","#CC333F","#00A0B0", "#0EB000" , "#B00092"]);
        
        //Legend titles

        var radarChartOptions = {
          w: width,
          h: height,
          labelFactor: 1.25,
          margin: margin,
          maxValue: 0.5,
          levels: 5,
          roundStrokes: true,
          color: color
        };
        //Call function to draw the Radar chart
        RadarChart(".radarChart", data, radarChartOptions);
  }

  traitement(myCity) {
    let events = [];
    let concert = 0,
        festival = 0,
        culture = 0,
        cinema = 0,
        exposition = 0,
        theatre = 0,
        spectacle = 0;

    this.props.tags.forEach(function(tag) {
      if (tag.city.includes(myCity)) {
        if (tag.tags.includes("Concert") || tag.tags.includes("concert") || tag.tags.includes("CONCERT")) {
          concert = concert + 1;
        }
        if (tag.tags.includes("Festival") || tag.tags.includes("festival") || tag.tags.includes("FESTIVAL")) {
          festival = festival + 1;
        }
        if (tag.tags.includes("Culture") || tag.tags.includes("culture") || tag.tags.includes("CULTURE")) {
          culture = culture + 1;
        }
        if (tag.tags.includes("Ciné") || tag.tags.includes("ciné") || tag.tags.includes("CINÉ") || 
            tag.tags.includes("cine") || tag.tags.includes("CINE") || tag.tags.includes("Cine")) {
          cinema = cinema + 1;
        }
        if (tag.tags.includes("Expo") || tag.tags.includes("expo") || tag.tags.includes("EXPO")) {
          exposition = exposition + 1;
        }
        if (tag.tags.includes("Théâtre") || tag.tags.includes("théâtre") || tag.tags.includes("THÉÂTRE") || 
            tag.tags.includes("theatre") || tag.tags.includes("Theatre") || tag.tags.includes("THEATRE")) {
          theatre = theatre + 1;
        }
        if (tag.tags.includes("Spectacle") || tag.tags.includes("spectacle") || tag.tags.includes("SPECTACLE")) {
          spectacle = spectacle + 1;
        }
      }
    });

    let total = concert + culture + cinema + spectacle + festival + theatre + exposition;

    if (total === 0) {
      events.push(JSON.parse('{ "axis": "Concert", "value": "0" }'));
      events.push(JSON.parse('{ "axis": "Festival", "value": "0" }'));
      events.push(JSON.parse('{ "axis": "Culture", "value": "0" }'));
      events.push(JSON.parse('{ "axis": "Théâtre", "value": "0" }'));
      events.push(JSON.parse('{ "axis": "Spectacle", "value": "0" }'));
      events.push(JSON.parse('{ "axis": "Cinéma", "value": "0" }'));
      events.push(JSON.parse('{ "axis": "Exposition", "value": "0" }'));
    } else {
      events.push(JSON.parse('{ "axis": "Concert", "value": "' + Number.parseFloat(concert/total).toFixed(2) + '" }'));
      events.push(JSON.parse('{ "axis": "Festival", "value": "' + Number.parseFloat(festival/total).toFixed(2) + '" }'));
      events.push(JSON.parse('{ "axis": "Culture", "value": "' + Number.parseFloat(culture/total).toFixed(2) + '" }'));
      events.push(JSON.parse('{ "axis": "Théâtre", "value": "' + Number.parseFloat(theatre/total).toFixed(2) + '" }'));
      events.push(JSON.parse('{ "axis": "Spectacle", "value": "' + Number.parseFloat(spectacle/total).toFixed(2) + '" }'));
      events.push(JSON.parse('{ "axis": "Cinéma", "value": "' + Number.parseFloat(cinema/total).toFixed(2) + '" }'));
      events.push(JSON.parse('{ "axis": "Exposition", "value": "' + Number.parseFloat(exposition/total).toFixed(2) + '" }'));
    }
    
    return events;
  }
}
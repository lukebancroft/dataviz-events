import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import './App.css';
import PointMap from './components/PointMap';
import HeatMapCal from './components/HeatMapCal';
import CounterCards from './components/CounterCards';
import SideNav from './components/SideNav';
import Filters from './components/Filters';
import ChartPie from './components/ChartPie';
import Radar from './components/Radar/Radar';
class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
      graph: '',
      nbEvents: 1000,
      type: 'All',
      startDate: moment().subtract(1, 'years'),
      endDate: moment(),
      query: '',
      count: 0,
      gratuits: 0,
      payants: 0,
      moyenne: 0,
      locations:[],
      eventsPerDate: [],
      departement_prix: [],
      tags: []
    }
  }

  componentDidMount() {
    this.getEvents();
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div id="sidebar" className="col-md-2">
              <SideNav
                handleGraphChange={this.handleGraphChange.bind(this)}
              />
            </div>
            <div id="content" className="col-md-10">
                <CounterCards 
                  count={this.state.count}
                  gratuits={this.state.gratuits} 
                  payants={this.state.payants}
                  moyenne={this.state.moyenne}  
                />
                <Filters 
                  nbEvents={this.state.nbEvents}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  applyFilters={this.applyFilters.bind(this)}
                />
                <div id="loader"></div>
                <br/>
                <div id="graph" className="animate-bottom">
                  {this.getGraph()}
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleGraphChange(graph) {
    this.setState({ graph: graph });
  }

  applyFilters(nbEvents, type, startDate, endDate) {
    //"(pricing_info:[libre OR gratuit])"
    let queryBuilder = '';
    let isBuilt = false;

    startDate = (startDate === "Invalid date") ? null : startDate;
    endDate = (endDate === "Invalid date") ? null : endDate;

    if (startDate || endDate) {
      if (startDate && endDate) {
        queryBuilder = "((date_start:[" + startDate + " TO " + endDate + "]) OR (date_end:[" + startDate + " TO " + endDate + "]))";
        isBuilt = true;
      }
      else if (startDate) {
        queryBuilder = "(date_start:" + startDate + ")";
        isBuilt = true;
      }
      else {
        queryBuilder = "(date_end:" + endDate + ")";
        isBuilt = true;
      }
    }
    if (type) {
      if (isBuilt && type !== "All") {
        queryBuilder += " AND"
      }
      if (type === "Free") {
        queryBuilder += " (pricing_info:libre OR pricing_info:gratuit)"
      }
      else if (type === "Paid") {
        queryBuilder += " NOT pricing_info:libre AND NOT pricing_info:gratuit AND NOT #null(pricing_info))"
      }
      else {
        queryBuilder += " #null(pricing_info)"
      }
    }
    queryBuilder = (queryBuilder.length > 0) ? "(" + queryBuilder + ")" : queryBuilder;

    this.setState({nbEvents: nbEvents, query: queryBuilder}, () => {
      this.enableLoader();
      this.getEvents();
    });
  }

  enableLoader() {
    document.getElementById("loader").style.display = "block";
    document.getElementById("graph").style.display = "none";
    document.getElementById("menu-content").style.pointerEvents = "none";
    document.getElementById("filter-group").style.pointerEvents = "none";
  }

  disableLoader() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("graph").style.display = "block";
    document.getElementById("menu-content").style.pointerEvents = "all";
    document.getElementById("filter-group").style.pointerEvents = "all";
  }

  getGraph() {
    if (this.state.graph === 'map') {
      return <PointMap
                locations={this.state.locations}
              />;
    } else if (this.state.graph === 'calendar') {
        return <HeatMapCal 
                  eventsPerDate={this.state.eventsPerDate}
                />;
    } else if (this.state.graph === 'pie') {
        return <ChartPie departement_prix={this.state.departement_prix}/>;
    } else if (this.state.graph === 'radar') {
      return <Radar
                tags={this.state.tags}
              />;
    } else {
      return <div><p>Visualisation des données d'évènements</p><br/><p>[Mettre sujet et description ici]</p></div>
    }
  }

  getEvents() {
    axios.get('https://public.opendatasoft.com/api/records/1.0/search/', {
          params: {
              dataset: "evenements-publics-cibul",
              rows: this.state.nbEvents,
              q: this.state.query
          }
        })
        .then(res => {
          let latlons = [];
          let groupedByDate = [];
          let tagsBycity = [];
          let gratuits = 0;
          let payants = 0;
          let moyenne = 0;
          let departement_prix = [];
          Object.keys(res.data.records).forEach(function(key) {
            latlons.push(res.data.records[key].fields.latlon);
            let startDate = res.data.records[key].fields.date_start;
            if (startDate) {
              if (!groupedByDate[startDate]) {
                groupedByDate[startDate] = 1;
              }
              else {
                groupedByDate[startDate]++;
              }
            }

            let tarif = res.data.records[key].fields.pricing_info;
            if (tarif) {
              if (tarif.toLowerCase().includes("libre") || tarif.toLowerCase().includes("gratuit")) {
                departement_prix.push(res.data.records[key].fields.department+':graduit')
                gratuits++;
              }
              else {
                departement_prix.push(res.data.records[key].fields.department+':payant')
                payants++;
              }
            }

            if (res.data.records[key].fields.tags === undefined) {
              tagsBycity.push(JSON.parse('{ "city": "' + res.data.records[key].fields.city + '", "tags": "rien" }'));
            } else if(res.data.records[key].fields.tags.includes('"')) {
              res.data.records[key].fields.tags = res.data.records[key].fields.tags.replace(/"/gi, '');
              tagsBycity.push(JSON.parse('{ "city": "' + res.data.records[key].fields.city + '", "tags": "' + res.data.records[key].fields.tags + '" }'));
            } else {
              tagsBycity.push(JSON.parse('{ "city": "' + res.data.records[key].fields.city + '", "tags": "' + res.data.records[key].fields.tags + '" }'));
            }
          });
          moyenne = Object.keys(groupedByDate).length / this.state.nbEvents;
          this.setState({ count: res.data.nhits, gratuits: gratuits, payants: payants, moyenne: moyenne, locations: latlons, eventsPerDate: groupedByDate, tags: tagsBycity }, () => {
            this.disableLoader();
            
          });
          this.setState({
            departement_prix: departement_prix
          },()=>console.log(this.state))
        })
  }
}

export default App;

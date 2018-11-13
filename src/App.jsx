import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import PointMap from './components/PointMap';
import CounterCards from './components/CounterCards';
import SideNav from './components/SideNav';

class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
      graph: '',
      nbEvents: 1000,
      count: 0,
      gratuits: 0,
      payants: 0,
      moyenne: 0,
      locations:[]
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

                <div id="loader"></div>
                <div id="graph" className="animate-bottom">
                  {this.getGraph()}
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getGraph() {
    if (this.state.graph === 'map') {
      return <PointMap
                locations={this.state.locations}
              />;
    } else if (this.state.graph === 'calendar') {
        return 'calendar';
    }
    else if (this.state.graph === 'pie') {
        return 'pie';
    } else {
      return <div><p>Visualisation des données d'évènements</p><br/><p>[Mettre sujet et description ici]</p></div>
    }
  }

  handleGraphChange(graph) {
    this.setState({ graph: graph });
  }

  getEvents() {
    axios.get('https://public.opendatasoft.com/api/records/1.0/search/', {
          params: {
              dataset: "evenements-publics-cibul",
              facet: "city",
              rows: this.state.nbEvents
          }
        })
        .then(res => {
          let latlons = [];
          let groupedByDate = [];
          let gratuits = 0;
          let payants = 0;
          let moyenne = 0;
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
              if (tarif.includes("libre") || tarif.includes("gratuit") || tarif.includes("gratuite")) {
                gratuits++;
              }
              else {
                payants++;
              }
            }
          });
          moyenne = Object.keys(groupedByDate).length / this.state.nbEvents;
          this.setState({ count: res.data.nhits, gratuits: gratuits, payants: payants, moyenne: moyenne, locations: latlons }, () => {
            document.getElementById("loader").style.display = "none";
            document.getElementById("graph").style.display = "block";
            document.getElementById("menu-content").style.pointerEvents = "all";
          });
        })
  }
}

export default App;

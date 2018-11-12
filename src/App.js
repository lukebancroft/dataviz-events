import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import CloudGraph from './components/CloudGraph';
import LeafletMap from './components/LeafletMap';

class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
      locations:[]
		}
  }

  componentDidMount() {
    this.getEvents();
  }

  render() {
    return (
      <div className="App">
        <CloudGraph
          locations={this.state.locations}
        />
      </div>
    );
  }

  getEvents() {
    axios.get('https://public.opendatasoft.com/api/records/1.0/search/', {
          params: {
              dataset: "evenements-publics-cibul",
              facet: "city",
              rows: 1000
          }
        })
        .then(res => {
            let latlons = [];
            Object.keys(res.data.records).forEach(function(key) {
            latlons.push(res.data.records[key].fields.latlon);
          });
          this.setState({ locations: latlons });
        })
  }
}

export default App;

import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import '../assets/SideNav.css';
import 'react-datepicker/dist/react-datepicker.css';

export default class Filters extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            nbEvents: this.props.nbEvents,
            type: this.props.type,
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            region: undefined
        }
        this.departement = React.createRef();
        this.city = React.createRef();

        this.handleApplyFilters = this.handleApplyFilters.bind(this);
        this.onNbEventsChange = this.onNbEventsChange.bind(this);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    }
// Filters needed :
// city, departement, region

  render() {
    return (
        <div className="row jumbotron" style={{paddingTop: "8px", paddingBottom: "8px"}} id="filter-group">
            <h3 style={{textDecoration: "underline" }}>Filter data :</h3>
            <div className="input-group col-md-12">
                <div className="input-group col-md-4 col-sm-12">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="rowSizeSelect">Number of events</label>
                    </div>
                    <select className="custom-select" id="rowSizeSelect" value={this.state.nbEvents} onChange={(e) => this.onNbEventsChange(e)}>
                        <optgroup label="Short loading time">
                            <option>100</option>
                            <option>1000</option>
                            <option>5000</option>
                        </optgroup>
                        <optgroup label="Long loading time">
                            <option>10000</option>
                            <option>25000</option>
                            <option>50000</option>
                            <option>100000</option>
                            <option>350000</option>
                            <option>500000</option>
                        </optgroup>
                    </select>
                </div>
                <div className="input-group col-md-4 col-sm-12">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="eventTypeSelect">Type</label>
                    </div>
                    <select className="custom-select" id="eventTypeSelect" value={this.state.type} onChange={(e) => this.onTypeChange(e)}>
                        <option>All</option>
                        <option>Free</option>
                        <option>Paid</option>
                        <option>Unspecified</option>
                    </select>
                </div>
            </div>

            <div className="input-group col-md-12">
                <div className="input-group col-md-4">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="startDateCal">Start date</label>
                    </div>
                    <DatePicker 
                        className="form-control"
                        id="startDateCal"
                        selected={this.state.startDate}
                        selectsStart
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeStartDate}
                        dateFormat="DD/MM/YYYY"
                    />
                </div>
                <div className="input-group col-md-4 col-sm-12">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="endDateCal">End date</label>
                    </div>
                    <DatePicker 
                        className="form-control"
                        id="endDateCal"
                        selected={this.state.endDate}
                        selectsEnd
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeEndDate}
                        dateFormat="DD/MM/YYYY"
                    />
                </div>
            </div>

            <div className="input-group col-md-12">
                <div className="input-group col-lg-4 col-md-12 col-sm-12">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="regionSelect">Region</label>
                    </div>
                    <select className="custom-select" id="regionSelect" value={this.state.region} onChange={(e) => this.onRegionChange(e)}>
                        <option>Sélectionner...</option>
                        <option>Auvergne-Rhône-Alpes</option>
                        <option>Bourgogne-Franche-Compté</option>
                        <option>Bretagne</option>
                        <option>Centre-Val-de-Loire</option>
                        <option>Corse</option>
                        <option>Grand-Est</option>
                        <option>Guadeloupe</option>
                        <option>Guyane</option>
                        <option>Hauts-de-France</option>
                        <option>Ile-de-France</option>
                        <option>Martinique</option>
                        <option>Mayotte</option>
                        <option>Normandie</option>
                        <option>Nouvelle-Aquitaine</option>
                        <option>Occitanie</option>
                        <option>Pays-de-la-Loire</option>
                        <option>Provence-Alpes-Cote-d-Azur</option>
                        <option>Reunion</option>
                    </select>
                </div>
                <div className="input-group col-lg-4 col-md-12 col-sm-12">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="deptSelect">Département</label>
                    </div>
                    <input type="text" id="deptSelect" className="form-control" placeholder="Enter dept name..." ref={this.departement}></input>
                </div>
                <div className="input-group col-lg-4 col-md-12 col-sm-12">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="citySelect">Ville</label>
                    </div>
                    <input type="text" id="citySelect" className="form-control" placeholder="Enter city name..." ref={this.city}></input>
                </div>
            </div>

            <div className="col-lg-12 col-md-12">
                <button type="button" style={{float: "right", marginTop: "5px"}} className="btn btn-primary" onClick={this.handleApplyFilters}>Apply</button>
            </div>
        </div>
    );
  }

  handleApplyFilters() {
    let departement = (this.departement.current.value && this.departement.current.value.trim().length > 0) ? this.departement.current.value : undefined;
    let city = (this.city.current.value && this.city.current.value.trim().length > 0) ? this.city.current.value : undefined;
    this.props.applyFilters(this.state.nbEvents, this.state.type, moment(this.state.startDate).format('YYYY-MM-DD'), moment(this.state.endDate).format('YYYY-MM-DD'), this.state.region, departement, city);
  }

  onNbEventsChange(event) {
    this.setState({nbEvents: event.target.value});
  }

  onTypeChange(event) {
    this.setState({type: event.target.value});
  }

  handleChangeStartDate(date) {
    this.setState({ startDate: date });
  }

  handleChangeEndDate(date) {
    this.setState({ endDate: date });
  }

  onRegionChange(event) {
    let region = event.target.value === "Sélectionner..." ? undefined : event.target.value;
    this.setState({region: region});
  }
}
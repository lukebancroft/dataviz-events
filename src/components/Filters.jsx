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
            endDate: this.props.endDate 
        }
        this.handleApplyFilters = this.handleApplyFilters.bind(this);
        this.onNbEventsChange = this.onNbEventsChange.bind(this);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    }
// Filters needed :
// city, departement, region

  render() {
    return (
        <div className="row" id="filter-group">
            <div className="input-group col-md-12">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="rowSizeSelect">Number of events</label>
                </div>
                <select className="custom-select" id="rowSizeSelect" value={this.state.nbEvents} onChange={(e) => this.onNbEventsChange(e)}>
                    <option>100</option>
                    <option>1000</option>
                    <option>5000</option>
                    <option>10000</option>
                </select>

                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="rowSizeSelect">Type</label>
                </div>
                <select className="custom-select" id="rowSizeSelect" value={this.state.type} onChange={(e) => this.onTypeChange(e)}>
                    <option>All</option>
                    <option>Free</option>
                    <option>Paid</option>
                    <option>Unspecified</option>
                </select>
            </div>
            

            <div className="input-group col-lg-8 col-md-12">
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
            <button type="button" className="btn btn-primary" onClick={this.handleApplyFilters}>Apply</button>
        </div>
    );
  }

  handleApplyFilters() {
    this.props.applyFilters(this.state.nbEvents, this.state.type, moment(this.state.startDate).format('YYYY-MM-DD'), moment(this.state.endDate).format('YYYY-MM-DD'))
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
}
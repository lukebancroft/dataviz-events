import React from 'react';
import '../assets/SideNav.css'

export default class SideNav extends React.Component {

  render() {
    return (
        <div className="nav-side-menu">
            <div className="brand">Dataviz-events</div>
                <div className="menu-list">
        
                    <ul id="menu-content" className="menu-content">
                        <li onClick={ () => this.props.handleGraphChange('home')}>
                            <a href="#">
                                <i className="fa fa-dashboard fa-lg"></i> Home
                            </a>
                        </li>

                        <li onClick={ () => this.props.handleGraphChange('map')}>
                            <a href="#">
                                <i className="fa fa-globe fa-lg"></i> Map
                            </a>
                        </li>

                        <li onClick={ () => this.props.handleGraphChange('calendar')}>
                            <a href="#">
                                <i className="fa fa-calendar fa-lg"></i> Calendar
                            </a>
                        </li>

                        <li onClick={ () => this.props.handleGraphChange('pie')}>
                            <a href="#">
                                <i className="fa fa-pie-chart fa-lg"></i> Pie chart
                            </a>
                        </li>
                    </ul>
            </div>
        </div>
    );
  }
}
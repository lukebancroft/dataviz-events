import React from 'react';
import '../assets/SideNav.css'

export default class SideNav extends React.Component {

  render() {
    return (
        <div className="nav-side-menu">
            <div className="brand"><i className="fa fa-cubes" aria-hidden="true"></i> Dataviz-events</div>
                <div className="menu-list">
        
                    <ul id="menu-content" className="menu-content">
                        <li onClick={ () => this.props.handleGraphChange('home')}>
                            <a href="#0">
                                <i className="fa fa-dashboard fa-lg"></i> Home
                            </a>
                        </li>

                        <li onClick={ () => this.props.handleGraphChange('map')}>
                            <a href="#0">
                                <i className="fa fa-globe fa-lg"></i> Map
                            </a>
                        </li>

                        <li onClick={ () => this.props.handleGraphChange('calendar')}>
                            <a href="#0">
                                <i className="fa fa-calendar fa-lg"></i> Calendar
                            </a>
                        </li>

                        <li onClick={ () => this.props.handleGraphChange('pie')}>
                            <a href="#0">
                                <i className="fa fa-pie-chart fa-lg"></i> Pie chart
                            </a>
                        </li>
                    </ul>
            </div>
        </div>
    );
  }
}
import React from 'react';
import '../assets/CounterCards.css';

export default class CounterCards extends React.Component {

  render() {
    return (
        <div>
            <div className="row topbar">

            </div>
            <div className="custom-container row">
                <div className="col-md-3">
                    <div className="card-counter danger">
                        <i className="fa fa-ticket"></i>
                        <span className="count-numbers">{this.props.gratuits}</span>
                        <span className="count-name">Gratuits</span>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card-counter success">
                        <i className="fa fa-money"></i>
                        <span className="count-numbers">{this.props.payants}</span>
                        <span className="count-name">Payants</span>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card-counter info">
                        <i className="fa fa-calendar-plus-o"></i>
                        <span className="count-numbers">{this.props.moyenne}</span>
                        <span className="count-name">Moyenne/jour</span>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card-counter primary">
                        <i className="fa fa-database"></i>
                        <span className="count-numbers">{this.props.count}</span>
                        <span className="count-name">Évènements</span>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
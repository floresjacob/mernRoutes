import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add'
import '../css/App.css';

// import React, { Component, Fragment } from "react";
// import Add from './Add'
// import "../css/App.css";
// import axios from 'axios';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Players from "../pages/Players";
// import Home from "../pages/Home";
// import Profile from "../pages/Profile";

// import Signup from "../pages/SignUp"
// import Login from "../pages/Login";


export default class App extends React.Component {
  constructor() {
    super();
    this.state = { selectedRank: 'Master', selectedRole: "Top", selectedServer: "NA", data: [] };
    // this.getData = this.getData.bind(this);
  }
  // componentDidMount() {
  //   this.getData(this, 'Master');
  // }
  // componentWillReceiveProps(nextProps) {
  //   this.getData(this, 'Master');
  // }
  // getData(ev, year) {
  //   axios.get('/getAll?month=All&year=' + year)
  //     .then(function (response) {
  //       ev.setState({ data: response.data });
  //       ev.setState({ selectedYear: parseInt(year) })
  //     });
  // }
  render() {
    return (
      <div>
        <Add selectedRank={this.state.selectedRank} selectedRole={this.state.selectedRole} selectedServer={this.state.selectedServer} />
        {/* <table>
          <thead>
            <tr><th></th><th className='desc-col'>Description</th><th className='button-col'>Amount</th><th className='button-col'>Month</th><th className='button-col'>Year</th></tr>
          </thead>
          <tbody>
            {
              this.state.data.map(function (exp) {
                return <tr><td className='counterCell'></td><td className='desc-col'>{exp.description}</td><td className='button-col'>{exp.amount}</td><td className='button-col'>{exp.month}</td><td className='button-col'>{exp.year}</td></tr>
              })
            }
          </tbody>
        </table> */}
      </div>
    );
  }
}

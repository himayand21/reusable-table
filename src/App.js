import React, { Component } from "react";

import { TableContainer } from './TableContainer';
import { FundDetails } from './FundDetails';

import "./App.scss";

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

class App extends Component {
  state = {
    data: []
  };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const response = await fetch("https://api.kuvera.in/api/v3/funds.json");
    const data = await response.json();
    this.setState({ data });
  };
  render() {
    const { data } = this.state;
    return (
      <Router>
        <div className="app-block">
          <Switch>
            <Route exact path="/">
              <TableContainer data={data} />
            </Route>
            <Route exact path="/:fundId">
              <FundDetails />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

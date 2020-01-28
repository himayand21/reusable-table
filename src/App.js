import React, { Component } from "react";

import {Table} from './Table';
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="app-block">
        <Table
			className=""
			data={[
				{
					firstName: "Himayan",
					lastName: "Debnath"
				},
				{
					firstName: "Ankita",
					lastName: "Chakraborty"
				}
			]}
			columns={[
				{
					header: "First Name",
					accessor: (d) => d.firstName,
					headerStyle: {minWidth: 200},
					cell: (value, row) => <span>{value}</span>
				},
				{
					header: "Last Name",
					accessor: (d) => d.lastName
				}
			]}
		/>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";

import Table from './Table';
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
				},
				{
					firstName: "Saikat",
					lastName: "Jana"
				}
			]}
			columns={[
				{
					header: "First Name",
					key: "firstName",
					accessor: (d) => d.firstName,
					cell: (value, row) => <span>{value}</span>,
					filterable: true
				},
				{
					header: "Last Name",
					key: "lastName",
					accessor: (d) => d.lastName
				}
			]}
		/>
      </div>
    );
  }
}

export default App;

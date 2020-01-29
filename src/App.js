import React, { Component } from "react";

import Table from "./Table";
import "./App.scss";

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
    if (data) {
      return (
        <div className="app-block">
          <Table
            className=""
            paginate
            sizePerPage={100}
            data={data}
            columns={[
              {
                header: "Name",
                key: "name",
                accessor: d => d.name,
                cell: (value, row) => <span>{value}</span>,
                filterable: true,
                sortable: true
              },
              {
                header: "Fund Category",
                key: "category",
                accessor: d => d.category,
                filterable: true,
                sortable: true
              },
              {
                header: "Fund Type",
                key: "type",
                accessor: d => d.fund_type,
                filterable: true,
                sortable: true
              },
              {
                header: "Plan",
                key: "plan",
                accessor: d => d.plan,
                filterable: true,
                sortable: true
              },
			  {
                header: "Year 1 Returns",
                key: "year1",
                accessor: d => d.returns.year_1,
                filterable: true,
                sortable: true
              },
			  {
                header: "Year 3 Returns",
                key: "year3",
                accessor: d => d.returns.year_3,
                filterable: true,
                sortable: true
              }
            ]}
          />
        </div>
      );
    }
    return null;
  }
}

export default App;

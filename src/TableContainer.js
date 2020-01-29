import React, { Fragment } from "react";
import {Link} from "react-router-dom";

import Table from "./Table";

export const TableContainer = (props) => {
    const { data } = props;
    return (
        <Fragment>
            <h1>Funds Table</h1>
            <Table
                paginate
                sizePerPage={100}
                data={data}
                columns={[
                    {
                        header: "Name",
                        key: "name",
                        accessor: d => d.name,
                        cell: (value, row) => <Link to={row.code}>{value}</Link>,
                        filterable: true,
                        sortable: true
                    },
                    {
                        header: "Fund Category",
                        key: "category",
                        accessor: d => d.category,
                        filterable: "select",
                        sortable: true
                    },
                    {
                        header: "Fund Type",
                        key: "type",
                        accessor: d => d.fund_type,
                        filterable: "select",
                        sortable: true
                    },
                    {
                        header: "Plan",
                        key: "plan",
                        accessor: d => d.plan,
                        filterable: "select",
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
        </Fragment>
    )
}
import React, { Component } from "react";
import PropTypes from "prop-types";
import "./table.scss";

// TODO: filter method, pagination, sorting, onClick functionality
class Table extends Component {
  state = {
    search: {}
  };
  handleSearch = (event) => {
    const { target } = event;
    const { value, dataset } = target;
    const { searchkey } = dataset;
    this.setState({
      search: {
        ...this.state.search,
        [searchkey]: value
      }
    })
  }
  render() {
    const { data, columns, className } = this.props;
    const { search } = this.state;
    const filteredData = data.filter((row) => {
      const filterableColumns = columns.filter((column) => column.filterable);
      return filterableColumns.every((column) => {
        const {key, accessor} = column;
        if (!search[key]) return true;
        else return accessor(row).includes(search[key])
      })
    });
    return (
      <table className={`reusable_table ${className}`}>
        <thead>
          <tr>
            {columns.map(each => {
              const { header, headerStyle } = each;
              return <td style={headerStyle} title={header}>{header}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {columns.some(column => column.filterable) ?
            <tr className="search_row">
              {columns.map(column => {
                const { key, filterable } = column;
                return (
                  <td>
                    {filterable ?
                    <input
                      value={search[key]}
                      onChange={this.handleSearch}
                      data-searchkey={key}
                    /> : null}
                  </td>
                )
              })}
            </tr> :
            null}
          {filteredData.map(row => {
            return (
              <tr>
                {columns.map(column => {
                  const { cell, accessor } = column;
                  const value = accessor(row);
                  return (
                    <td
                      title={value}
                    >
                      {cell ? cell(value, row) : value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    cell: PropTypes.func,
    accessor: PropTypes.func.isRequired
  })).isRequired,
  className: PropTypes.string
}

export default Table;
import React, { Component } from "react";
import PropTypes from "prop-types";
import "./table.scss";

const noOptions = "-- select --";

class Table extends Component {
  state = {
    search: {},
    sort: {},
    pageNo: 1
  };

  handlePrevious = () => this.setState({ pageNo: this.state.pageNo - 1 });

  handleNext = () => this.setState({ pageNo: this.state.pageNo + 1 });

  handleSearch = event => {
    const { target } = event;
    const { value, dataset } = target;
    const { searchkey } = dataset;
    this.setState({
      search: {
        ...this.state.search,
        [searchkey]: value
      }
    });
  };

  handleSelect = event => {
    const { target } = event;
    const { value, name } = target;
    if (value === noOptions) {
      this.setState({ search: {} });
    } else {
      this.setState({
        search: {
          [name]: value
        }
      });
    }
  }

  handleSort = event => {
    const { target } = event;
    const { dataset } = target;
    const { sortkey } = dataset;
    const { [sortkey]: oldSortValue } = this.state.sort;
    this.setState({
      sort: {
        [sortkey]: oldSortValue === "ASC" ? "DESC" : "ASC"
      }
    });
  };

  render() {
    const { data, columns, className, paginate, sizePerPage } = this.props;
    const { search, sort, pageNo } = this.state;

    const filteredData = data.filter(row => {
      const filterableColumns = columns.filter(column => column.filterable);
      return (filterableColumns.every(column => {
        const { key, accessor, filterMethod, filterable } = column;
        if (!search[key]) return true;
        if (filterable === "select") {
          return (
            accessor(row) === search[key]);
        }
        if (filterMethod) {
          return (
            filterMethod(search[key], accessor(row))
          )
        }
        return (
          accessor(row)
            .toString()
            .includes(search[key].toString())
        );
      }));
    });

    const sortedData = filteredData.sort((first, second) => {
      const sortableColumns = columns.filter(column => column.sortable);
      const sortColumn = sortableColumns.find(each => sort[each.key]);
      if (sortColumn) {
        const { key, accessor } = sortColumn;
        const secondValue = accessor(second);
        const firstValue = accessor(first);
        if (!firstValue || !secondValue) {
          return 1;
        }
        if (isNaN(firstValue) || isNaN(secondValue)) {
          if (sort[key] === "ASC") {
            return firstValue.localeCompare(secondValue);
          } else {
            return secondValue.localeCompare(firstValue);
          }
        } else {
          if (sort[key] === "ASC") {
            return firstValue - secondValue;
          } else {
            return secondValue - firstValue;
          }
        }
      }
    });

    const slicedData = paginate
      ? sortedData.slice((pageNo - 1) * sizePerPage, pageNo * sizePerPage)
      : sortedData;

    return (
      <table className={`reusable_table ${className}`}>
        <thead>
          <tr>
            {columns.map(column => {
              const { header, headerStyle, key, sortable } = column;
              const sortableClass = sortable ? "sortable_header" : "";
              const sortedClass = sort[key] ? `${sort[key]}_header` : "";
              return (
                <td
                  style={headerStyle}
                  className={`${sortableClass} ${sortedClass}`}
                  title={header}
                  onClick={sortable ? this.handleSort : null}
                  data-sortkey={key}
                >
                  {header}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {columns.some(column => column.filterable) ? (
            <tr className="search_row">
              {columns.map(column => {
                const { key, filterable, accessor } = column;
                if (!filterable) return <td />;
                if (filterable === "select") {
                  const options = data.map((row) => accessor(row));
                  const uniqueOptions = [noOptions, ...new Set(options.filter(Boolean))];
                  return (
                    <td>
                      <select
                        value={search[key] || uniqueOptions[0]}
                        onChange={this.handleSelect}
                        name={key}
                      >
                        {uniqueOptions.map((option) => {
                          return (
                            <option
                              selected={search[key] ? (option === search[key]) : noOptions}
                            >
                              {option}
                            </option>
                          )
                        })}
                      </select>
                    </td>
                  )
                }
                return (
                  <td>
                    <input
                      value={search[key]}
                      onChange={this.handleSearch}
                      data-searchkey={key}
                    />
                  </td>
                );
              })}
            </tr>
          ) : null}
          {slicedData.map(row => {
            return (
              <tr>
                {columns.map(column => {
                  const { cell, accessor } = column;
                  const value = accessor(row);
                  return (
                    <td title={value}>{cell ? cell(value, row) : value}</td>
                  );
                })}
              </tr>
            );
          })}
          {paginate ? (
            <tr className="pagination_row">
              <td colSpan={columns.length}>
                <div>
                  <button onClick={this.handlePrevious} disabled={pageNo === 1}>
                    Previous
                  </button>
                  <span className="pagination_options">
                    {`Showing ${pageNo} out of ${Math.ceil(
                      sortedData.length / sizePerPage
                    )} pages`}
                  </span>
                  <button
                    onClick={this.handleNext}
                    disabled={
                      pageNo === Math.ceil(sortedData.length / sizePerPage)
                    }
                  >
                    Next
                  </button>
                </div>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cell: PropTypes.func,
      accessor: PropTypes.func.isRequired
    })
  ).isRequired,
  className: PropTypes.string
};

export default Table;

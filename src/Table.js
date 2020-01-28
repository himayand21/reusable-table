import React from "react";
import PropTypes from "prop-types";
import "./table.scss";

// TODO: filter method, pagination, sorting, onClick functionality
export const Table = props => {
  const { data, columns, className } = props;
  return (
    <table className={`reusable_table ${className}`}>
      <thead>
        <tr>
          {columns.map(each => {
            const { header, headerStyle } = each;
            return <td style={headerStyle}>{header}</td>;
          })}
        </tr>
      </thead>
      <tbody>
        {data.map(row => {
          return (
            <tr>
              {columns.map(column => {
                const { cell, accessor } = column;
                const value = accessor(row);
                return <td>{cell ? cell(value, row) : value}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

Table.propTypes = {
	data: PropTypes.array.isRequired,
	columns: PropTypes.arrayOf(PropTypes.shape({
		cell: PropTypes.func,
		accessor: PropTypes.func.isRequired
	})).isRequired,
	className: PropTypes.string
}
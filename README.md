# reusable-table

## How to run
```
npm install
npm start
```
## Table Component

**Table.js** is the reusable table component which takes in data and column configurations and contains features like sorting, filtering and searching throughout the table.

### Prop Details

* **className** - ClassName of the table component for style override.
* **data** - Array of objects which will be iterated in the table.
* **paginate** - Boolean flag to add pagination.
* **sizePerPage** - Number for number of rows per page.
* **columns** - Array of configurations for additional features.

Each column object configuration can contain -
1. **key** - unique key to be used for sorting or filtering inside the table.
2. **header** - label of each column.  
3. **filterable** - *select* or *input* for select box or searching.
4. **filterMethod** - custom method for searching.
5. **accessor** - method to pass values to the column by manipulating different elements of a row.
6. **cell** - method to return JSX expression which would be rendered inside a particular cell.
7. **sortable** - Boolean to enable sorting in each column.

# Getting Started with Table Component

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The `TableComponent` is a React component that is designed to display tabular data with various features. It takes several props to configure its behavior, such as `tableHead`, `records`, `page`, `rowsPerPage`, and many more. Let's dive deeper into each of these props and how they affect the component's functionality.

The `tableHead` prop is an array of objects that represents the columns of the table. Each object has an `id` property that uniquely identifies the column and a `label` property that defines the column's display name.

The `records` prop is an array of objects that represents the data to be displayed in the table. Each object in the array should have keys corresponding to the `id` properties in the `tableHead` array.

The `page` prop and its corresponding `setPage` method control the current page being displayed in the table. The `rowsPerPage` prop and its corresponding `setRowsPerPage` method control the number of rows displayed on each page.

The `handleRowsPerPageChange` method is called whenever the user changes the number of rows displayed per page. It takes the new number of rows as an argument.

The `totalRecords` prop is the total number of records in the table. This is used to calculate the number of pages in the table.

The `order` prop and its corresponding `setOrder` method control the current sort order of the table. The `orderBy` prop and its corresponding `setOrderBy` method control the current column being sorted on.

The `icons` prop is an array of strings representing the action icons to be displayed in the table. The `viewIconClickHandler` and `deleteIconClickHandler` methods are called whenever the user clicks the corresponding action icon. The `rowClickHandler` method is called whenever the user clicks on a row in the table.

The `selected` prop and its corresponding `setSelected` method represent the currently selected rows in the table. The `checkBox` prop is a boolean value that determines whether or not checkboxes should be displayed for each row.

The `EnhancedTableHead` function is a helper function that renders the table header. It takes several props, including `onSelectAllClick`, `order`, `orderBy`, `tableHead`, `numSelected`, `rowCount`, `onRequestSort`, and `checkBox`.

The `onSelectAllClick` method is called whenever the user clicks the "select all" checkbox in the table header. It takes an event object as its argument.

The `onRequestSort` method is called whenever the user clicks a column header to sort the table. It takes the `id` of the column being sorted as its argument.

The `numSelected` prop represents the number of rows currently selected in the table. The `rowCount` prop represents the total number of rows in the table.

The `TableComponent` function itself renders the table using Material-UI components such as `Table`, `TableBody`, `TableCell`, `TableContainer`, `TableHead`, `TableRow`, `TableSortLabel`, `Paper`, and `Checkbox`. It also renders pagination and a dropdown to select the number of rows per page using Material-UI's `Pagination` and `Select` components.

The `handleRequestSort` method is called whenever the user clicks a column header to sort the table. It takes the `id` of the column being sorted as its argument and updates the `orderBy` and `order` props accordingly.

The `handleSelectAllClick` method is called whenever the user clicks the "select all" checkbox in the table header. It updates the `selected` prop to include all rows if the checkbox is checked

import * as React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import "./TableComponent.css";
import { MenuItem, Pagination, Select, Stack, Tooltip } from "@mui/material";

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    tableHead,
    numSelected,
    rowCount,
    onRequestSort,
    checkBox = false,
  } = props;
  const createSortHandler = (property) => {
    console.log("property", property);
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        {checkBox && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
              className="checkbox-mui"
            />
          </TableCell>
        )}
        {tableHead.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
            className="table-header"
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              IconComponent={ArrowDropUpIcon}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={() => createSortHandler(headCell.id)}
              className="sorted-blk"
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  tableHead: PropTypes.array.isRequired,
  checkBox: PropTypes.bool
};

export default function TableComponent({
  tableHead,
  records,
  page,
  rowsPerPage,
  handleRowsPerPageChange,
  handlePageChange,
  totalRecords,
  order,
  setOrder,
  orderBy,
  setOrderBy,
  icons = [],
  viewIconClickHandler,
  deleteIconClickHandler,
  rowClickHandler = () => {},
  selected,
  setSelected,
  checkBox,
}) {
  
  // unique Id
  const UNIQUE_ID = "uuid"

  const handleRequestSort = (property) => {
    // compare orderby state for order and propery new orderBy value if both are same means user has just changed order property
    // if order state is asc and there change in order state then it must be desc
    const isDesc = orderBy === property && order === "asc";
    setOrder(isDesc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = records.map((n) => n[UNIQUE_ID]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleTablePageChange = (event, newPage) => {
    handlePageChange(newPage);
  };

  const handleRowsPerPageTableChange = (event) => {
    console.log("value type",typeof event.target.value,"value",event.target.value)
    handleRowsPerPageChange(event?.target?.value ?? 5);
  };
  const tableRowClickHandler = (event, id) => {
    rowClickHandler(id);
  };
  const visibilityIconClickHandler = (id) => {
    viewIconClickHandler(id);
  };
  const deleteIconTableClickHandler = (id) => {
    deleteIconClickHandler(id);
  };
  const isSelected = (id) => selected.indexOf(id) !== -1;

  const filterObject = (row) => {
    // let row = JSON.parse(JSON.stringify(row))
    let newObj = {};

    // console.log("before",row)
    tableHead.forEach((obj) => {
      if (Object.keys(row).includes(obj.id)) newObj[obj.id] = row[obj.id];
    });
    newObj[UNIQUE_ID] = row[UNIQUE_ID];
    // console.log("after", newObj);
    return newObj;
  };

  // Avoid a layout jump when reaching the last page with empty records.
  const emptyRows =
    page > 1 ? Math.max(0, page * rowsPerPage - totalRecords) : 0;
  // console.log("selected rows",selected)
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                tableHead={tableHead}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={records.length}
                checkBox={checkBox}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 records.slice().sort(getComparator(order, orderBy)) */}
                {records.map((row, index) => {
                  const isItemSelected = isSelected(row[UNIQUE_ID]);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => tableRowClickHandler(event, row[UNIQUE_ID])}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      {checkBox && (
                        <TableCell padding="checkbox">
                         
                          <Checkbox
                         
                            color="primary"
                            onClick={(e) => handleClick(e, row[UNIQUE_ID])}
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                      )}
                      {Object.keys(filterObject(row)).map((cell, _id) => {
                        const value = row[cell];
                        
                        if (cell !== UNIQUE_ID) {
                        
                          return (
                            <TableCell key={cell}>
                              {typeof value !== "string" ||
                              value?.length <= 30 ? (
                                typeof value !== "object" ? 
                                (
                                  value ?? "N/A"
                                ) : (
                                  JSON.stringify(value)
                                )
                              ) : (
                                <Tooltip
                                  key={cell}
                                  placement="bottom-start"
                                  enterDelay={1000}
                                  title={value}
                                >
                                  <span>{`${value?.slice(0, 30)}...`}</span>
                                </Tooltip>
                              )}
                            </TableCell>
                          );
                        }
                      })}
                      {icons.length > 0 && (
                        <TableCell>
                          {icons.includes("visibility") && (
                            <span>
                              <VisibilityOutlinedIcon
                                onClick={() =>
                                  visibilityIconClickHandler(row[UNIQUE_ID])
                                }
                              />
                            </span>
                          )}
                          {icons.includes("delete") && (
                            <span className="icon">
                              <DeleteIcon
                                onClick={() =>
                                  deleteIconTableClickHandler(row[UNIQUE_ID])
                                }
                              />
                            </span>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 69 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <div className="table-footer">
        <div>
          <div>
            <span>Records</span>
            <div>
              <div>
                <Select
                  value={rowsPerPage}
                  onChange={handleRowsPerPageTableChange}
                >
                  <MenuItem value={5} selected>
                    05
                  </MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            Showing {(page - 1) * rowsPerPage + 1} to{" "}
            {page * rowsPerPage <= totalRecords
              ? page * rowsPerPage
              : totalRecords}{" "}
            of {totalRecords} Entries
          </div>
          <Stack spacing={2}>
            <Pagination
              page={page}
              count={Math.ceil(totalRecords / rowsPerPage)}
              onChange={(event, value) => handleTablePageChange(event, value)}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </div>
      </div>
    </>
  );
}

TableComponent.propTypes = {
  tableHead: PropTypes.array.isRequired,
  records: PropTypes.array.isRequired,
  page:PropTypes.number.isRequired,
  rowsPerPage:PropTypes.number.isRequired,
  handleRowsPerPageChange: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  totalRecords: PropTypes.number.isRequired,
  order:PropTypes.oneOf(["asc", "desc"]).isRequired,
  setOrder:PropTypes.func.isRequired,
  orderBy: PropTypes.string.isRequired,
  setOrderBy: PropTypes.func.isRequired,
  icons: PropTypes.array,
  viewIconClickHandler: PropTypes.func,
  deleteIconClickHandler: PropTypes.func,
  rowClickHandler: PropTypes.func,
  selected:PropTypes.array,
  setSelected:PropTypes.func,
  checkBox:PropTypes.bool
}

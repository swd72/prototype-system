import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { StateContext } from "../provider/StateProvider";

// const columns = [
//   { id: "name", label: "Name", minWidth: 170 },
//   { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
//   {
//     id: "population",
//     label: "Population",
//     minWidth: 170,
//     align: "right",
//     format: (value) => value.toLocaleString("en-US"),
//   },
//   {
//     id: "size",
//     label: "Size\u00a0(km\u00b2)",
//     minWidth: 170,
//     align: "right",
//     format: (value) => value.toLocaleString("en-US"),
//   },
//   {
//     id: "density",
//     label: "Density",
//     minWidth: 170,
//     align: "right",
//     format: (value) => value.toFixed(2),
//   },
// ];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  tableRow: {
    "&$hover:hover": {
      backgroundColor: "#CE8ED7",
    },
    cursor: "pointer",
  },
  tableRowCustom: {
    "&$hover:hover": {
      backgroundColor: "#CE8ED7",
    },
    backgroundColor: "#ddd",
    cursor: "pointer",
  },
  tableRowCustomDark: {
    "&$hover:hover": {
      backgroundColor: "#CE8ED7",
    },
    backgroundColor: "#646262",
    cursor: "pointer",
  },
  hover: {},
});

export default function DataTableMini({ rows, size, columns, actions, handleAction }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { styleMode } = useContext(StateContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" size={size ? size : "small"}>
          <TableHead>
            <TableRow>
              {actions.length > 0 && (
                <TableCell align={"center"} colSpan={actions.length} style={{ minWidth: 100 }}>
                  จัดการ
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {
              return (
                <TableRow
                  hover
                  classes={{ hover: classes.hover }}
                  role="checkbox"
                  tabIndex={-1}
                  key={"rowmini" + idx}
                  className={
                    idx % 2
                      ? styleMode === "dark"
                        ? classes.tableRowCustomDark
                        : classes.tableRowCustom
                      : classes.tableRow
                  }
                >
                  {actions.map((column) => {
                    return (
                      <TableCell key={column.type} align={"center"}>
                        <Button
                          title={column.label}
                          variant="contained"
                          color={column.color}
                          size="small"
                          onClick={(e) => handleAction(column.type, row)}
                          startIcon={column.icon}
                          style={{
                            background: column.style?.bgColor || "#f50057",
                            borderRadius: 3,
                            border: 0,
                            color: column.style?.color || "white",
                          }}
                        >
                          {column.label}
                        </Button>
                      </TableCell>
                    );
                  })}

                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length <= 0 && (
              <TableRow hover tabIndex={-1}>
                <TableCell colSpan={columns.length} align="center">
                  <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    ไม่มีข้อมูล ...
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

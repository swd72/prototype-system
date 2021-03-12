/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import { TableBody } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button, UncontrolledTooltip } from "reactstrap";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Snackbar from "@material-ui/core/Snackbar";
import AddCircle from "@material-ui/icons/AddCircle";
import InputBase from "@material-ui/core/InputBase";
import { IoMdTrash } from "react-icons/io";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";
import { StateContext } from "../provider/StateProvider";
import { AuthContext } from "../provider/AuthProvider";
import styled from "styled-components";

const InTableCell = styled.div`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property, sort) => (event) => {
    if (sort) {
      onRequestSort(event, property);
    }
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(
                (headCell.firstDot ? headCell.firstDot : "") + headCell.id,
                headCell.sort
              )}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headCells: PropTypes.array.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const { onSearching, searchText, onAddData } = props;
  const classes = useToolbarStyles();
  const createSearch = (event) => {
    onSearching(event);
  };
  return (
    <Toolbar>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        ข้อมูลบุคลากร
      </Typography>

      <InputBase
        placeholder="ค้นหา… ชื่อ, สกุล, รหัสสแกน"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={searchText}
        onChange={createSearch}
        inputProps={{ "aria-label": "search" }}
      />

      <Tooltip title="เพิ่มข้อมูล">
        <IconButton aria-label="เพิ่มข้อมูล" onClick={() => onAddData()}>
          <AddCircle />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  onSearching: PropTypes.func.isRequired,
  onAddData: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  chip_spacing: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  paper: {
    width: "100%",
    contain: "container",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
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
}));

export default function CustomDataTable(props) {
  const { headCells } = props;
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("p.person_id");
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(20);
  const [rows, setRows] = useState([]);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);

  const mounted_ = useRef(null);
  const { styleMode } = useContext(StateContext);
  const { refresh_token, server_url, token } = useContext(AuthContext);

  useEffect(() => {
    mounted_.current = true
    setLoading(true)
    getData();
    return()=>{
      mounted_.current = false
    }
  }, [orderBy, page, order, search]);

  const getData = (loop_token) => {
    axios
      .post(
        `${server_url}/person/getperson`,
        {
          username,
          rowsPerPage,
          page,
          orderBy,
          order,
          keyword: search,
        },
        {
          headers: { authorization: `Bear ${loop_token || token}` }, // กำหนด headers authorization เพื่อส่งให้ api ตรวจสอบ token
        }
      )
      .then((rs) => {
        if (rs.status === 200 && mounted_.current) {
          setRows(rs.data.results);
          setTotalCount(
            rs.data.results.length > 0 ? rs.data.results[0].xtotal : 0
          );
          setLoading(false)
        }
      })
      .catch(async (error) => {
        if (error.response.status === 400 || error.response.status === 401) {
          refresh_token((cal) => {
            if(cal.token){
              getData(cal.token)
            }
          });
        }
      });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearching = (event) => {
    setSearch(event.target.value);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handelManageUserType = (event) => {
    console.log(event)
    setUsername(event);
    // setDialog(true);
  };

  const handleCloseSnack = () => {
    setSnackOpen(false);
  };

  const handleDelete = (e, mesage) => {
    confirmAlert({
      title: "ยืนยันการลบข้อมูล ",
      message: 'คุณต้องการลบข้อมูล " ' + mesage + ' " ใช่หรือไม่ \n',
      buttons: [
        {
          label: "ใช่",
          onClick: () => {
            console.log("dddd");
          },
        },
        {
          label: "ไม่ใช่",
          onClick: () => "",
        },
      ],
    });
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, totalCount - page * rowsPerPage);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          onSearching={handleSearching}
          onAddData={handelManageUserType}
          searchText={search}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={totalCount}
              headCells={headCells}
            />
            <TableBody>
              {loading && (
                <TableRow hover role="checkbox">
                  <TableCell
                    component="th"
                    scope="row"
                    colSpan={7}
                    padding="none"
                    align="center"
                  >
                    <Typography
                      className={classes.title}
                      variant="h6"
                      id="tableTitle"
                      component="div"
                    >
                      กำลังโหลด ...
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {!loading &&
                rows?.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      // role="checkbox"
                      // tabIndex={-1}
                      key={`tb${index}`}
                      classes={{ hover: classes.hover }}
                      className={
                        index % 2
                          ? styleMode === "dark"
                            ? classes.tableRowCustomDark
                            : classes.tableRowCustom
                          : classes.tableRow
                      }
                    >
                      {headCells.map((val_head, idx_head) => (
                        <TableCell key={`tbcell${idx_head}`} scope="row">
                          <InTableCell>{row[val_head.id]}</InTableCell>
                        </TableCell>
                      ))}
                      <TableCell>
                        <Button
                          title="ลบ"
                          id="deleteButton"
                          close
                          aria-label="Cancel"
                          onClick={(e) =>
                            handleDelete(
                              row.person_id,
                              row.fname + " " + row.lname
                            )
                          }
                        >
                          <span aria-hidden>
                            <IoMdTrash color="red" size="30" />
                          </span>
                        </Button>

                        <UncontrolledTooltip
                          placement="top"
                          target="deleteButton"
                        >
                          ลบข้อมูลผู้ใช้งาน
                        </UncontrolledTooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 25]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      <Snackbar
        open={snackOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity={true ? "success" : "error"}>
          {" "}
          {/* {snackMessage}{" "} */}
        </Alert>
      </Snackbar>

      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="ขนาดแถว"
      />
    </div>
  );
}

CustomDataTable.propTypes = {
  headCells: PropTypes.array.isRequired,
};

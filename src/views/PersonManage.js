import React from "react";
import { emphasize, withStyles } from "@material-ui/core/styles";
import CustomDataTable from "../components/CustomDataTable";
import HomeIcon from "@material-ui/icons/Home";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Chip from "@material-ui/core/Chip";

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.grey[300],
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip); //

const headCells = [
  {
    id: "person_id",
    firstDot: "p.",
    numeric: false,
    sort: true,
    label: "pid",
  },
  {
    id: "cprename_name",
    numeric: false,
    sort: true,
    label: "คำนำหน้า",
  },
  {
    id: "fname",
    numeric: false,
    sort: true,
    label: "ชื่อ",
  },
  {
    id: "lname",
    numeric: false,
    sort: true,
    label: "สกุล",
  },
  {
    id: "cid",
    numeric: false,
    sort: true,
    label: "เลขบัตรประชาชน",
  },
  {
    id: "cposition_name",
    numeric: false,
    sort: true,
    label: "ตำแหน่ง",
  },
  {
    id: "clevel_name",
    numeric: false,
    sort: true,
    label: "ระดับ",
  },
  {
    id: "startwork_date",
    numeric: false,
    sort: true,
    label: "วันที่เริ่มทำงาน",
  },
  {
    id: "pstatus_name",
    numeric: false,
    sort: true,
    label: "สถานะ",
  },
  {
    id: "๙",
    numeric: true,
    sort: false,
    disablePadding: false,
    label: "๙",
    action_status: true,
  },
];

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function FullScreenDialog(props) {

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          component="a"
          href="#"
          label="Home"
          icon={<HomeIcon fontSize="small" />}
          onClick={handleClick}
        />
        <StyledBreadcrumb component="a" href="#" label="Catalog" onClick={handleClick} />
        <StyledBreadcrumb label="Accessories" />
      </Breadcrumbs>
      <CustomDataTable headCells={headCells} />
    </div>
  );
}

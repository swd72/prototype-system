import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent";
import CustomDataTable from "../components/CustomDataTable";
import HomeIcon from "@material-ui/icons/Home";
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
    label: "วันที่",
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

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

export default function FullScreenDialog(props) {
  const classes = useStyles();
  return (
    <div>
      <BreadcrumbsComponent
        objLink={[
          {
            icon: <HomeIcon className={classes.icon} />,
            label: "Home",
            path: "/",
          },
        ]}
        current={{
          icon: <AddCircleIcon className={classes.icon} />,
          label: "ข้อมูลบุคลากร",
        }}
      />
      <CustomDataTable headCells={headCells} />
    </div>
  );
}

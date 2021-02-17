import React from "react";
import Button from "@material-ui/core/Button";
import { Form, FormGroup, Label, Container } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import CustomDataTable from "../components/CustomDataTable";

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

export default function FullScreenDialog(props) {
  return (
    <div>
      <CustomDataTable headCells={headCells} />
    </div>
  );
}

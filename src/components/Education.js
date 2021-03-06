import React, { useEffect, useState, useContext, useRef } from "react";
import { Container } from "reactstrap";
import { useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import ComponentCrud from "../components/ComponentCrud";
import { AuthContext } from "../provider/AuthProvider";
import { StateContext } from "../provider/StateProvider";
import { DateThai } from "../functions";
import DataTableMini from "./DataTableMini";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import SnackMessage from "./SnackMessage";

const columns = [
  { id: "cacademy_name", label: "ชื่อสถาศึกษา" },
  { id: "cdiploma_name", label: "ประกาศนียบัตร" },
  {
    id: "board",
    label: "คณะ",
  },
  {
    id: "major",
    label: "สาขา",
  },
  {
    id: "grade",
    label: "เกรดเฉลี่ย",
  },
  {
    id: "date_start",
    label: "วันที่เริ่ม",
    format: (value) => DateThai(value, "sortdate"),
  },
  {
    id: "date_end",
    label: "วันที่จบ",
    format: (value) => DateThai(value, "sortdate"),
  },
  {
    id: "other",
    label: "ข้อมูลเพิ่มเติม",
  },
];

const actions = [
  {
    type: "edit",
    label: "แก้ไข",
    style: {
      bgColor: "#ff9100",
    },
    icon: <DeleteIcon />,
  },
  {
    type: "delete",
    label: "ลบ",
    color: "secondary",
    icon: <DeleteIcon />,
  },
];

export default function Education({ person_id, editor }) {
  const [formStatus, setFormStatus] = useState(false);
  const cacademy = useSelector((state) => state.cacademy);
  const cdiploma = useSelector((state) => state.cdiploma);
  const [messageSnack, setMessageSnack] = useState("");
  const [objForm, setObjForm] = useState([
    {
      feild: "academy",
      label: "ชื่อสถานศึกษา",
      type: "autoOnRedux",
      options: cacademy,
    },
    {
      feild: "diploma",
      label: "ประกาศนียบัตร",
      type: "autoOnRedux",
      options: cdiploma,
    },
    {
      feild: "board",
      label: "คณะ",
      type: "textfeild",
    },
    {
      feild: "major",
      label: "สาขา",
      type: "textfeild",
    },
    {
      feild: "date_start",
      label: "วันที่เริ่ม",
      type: "datePicker",
    },
    {
      feild: "date_end",
      label: "วันที่จบ",
      type: "datePicker",
    },
    {
      feild: "grade",
      label: "เกรดเฉลี่ย",
      type: "textfeild",
    },
    {
      feild: "other",
      label: "ข้อมูลเพิ่มเติม",
      type: "textfeild",
    },
  ]);
  const [education, setEducation] = useState([]);
  const { getData } = useContext(StateContext);
  const { token, user } = useContext(AuthContext);
  const mounted = useRef(null);

  const formReset = () => {
    setFormStatus(false);
    setObjForm([
      {
        feild: "academy",
        label: "ชื่อสถานศึกษา",
        type: "autoOnRedux",
        options: cacademy,
      },
      {
        feild: "diploma",
        label: "ประกาศนียบัตร",
        type: "autoOnRedux",
        options: cdiploma,
      },
      {
        feild: "board",
        label: "คณะ",
        type: "textfeild",
      },
      {
        feild: "major",
        label: "สาขา",
        type: "textfeild",
      },
      {
        feild: "date_start",
        label: "วันที่เริ่ม",
        type: "datePicker",
      },
      {
        feild: "date_end",
        label: "วันที่จบ",
        type: "datePicker",
      },
      {
        feild: "grade",
        label: "เกรดเฉลี่ย",
        type: "textfeild",
      },
      {
        feild: "other",
        label: "ข้อมูลเพิ่มเติม",
        type: "textfeild",
      },
    ]);
    getData(token, { method: "get", path: "/cr/education/" + person_id }, {}, (respon) => {
      if (respon.status === 200 && mounted.current) {
        setEducation(respon.data.results);
      } if(mounted.current){
        setEducation([]);
      }
    });
  };

  useEffect(() => {
    mounted.current = true;
    getData(token, { method: "get", path: "/cr/education/" + person_id }, {}, (respon) => {
      if (respon.status === 200 && mounted.current) {
        setEducation(respon.data.results);
      }
    });
    return () => {
      mounted.current = false;
    };
  }, [getData, person_id, token]);

  const crudSubmit = (e) => {
    if (e.id) {
      getData(
        token,
        { method: "patch", path: "/cr/education" },
        { ...e, person_id, action_id: user.person_id },
        (respon) => {
          if (respon.status === 200 && mounted.current) {
            formReset();
            setMessageSnack("อัพเดทข้อมูลเสร็จสิ้น");
          }
        }
      );
    } else {
      getData(
        token,
        { method: "put", path: "/cr/education" },
        { ...e, person_id, action_id: user.person_id },
        (respon) => {
          if (respon.status === 200 && mounted.current) {
            formReset();
            setMessageSnack("เพิ่มข้อมูลเสร็จสิ้น");
          }
        }
      );
    }
  };

  const handleAction = (type, row) => {
    if (type === "edit") {
      setObjForm([
        {
          feild: "academy",
          label: "ชื่อสถานศึกษา",
          type: "autoOnRedux",
          options: cacademy,
          value: row.academy,
        },
        {
          feild: "diploma",
          label: "ประกาศนียบัตร",
          type: "autoOnRedux",
          options: cdiploma,
          value: row.diploma,
        },
        {
          feild: "board",
          label: "คณะ",
          type: "textfeild",
          value: row.board,
        },
        {
          feild: "major",
          label: "สาขา",
          type: "textfeild",
          value: row.major,
        },
        {
          feild: "date_start",
          label: "วันที่เริ่ม",
          type: "datePicker",
          value: row.date_start,
        },
        {
          feild: "date_end",
          label: "วันที่จบ",
          type: "datePicker",
          value: row.date_end,
        },
        {
          feild: "grade",
          label: "เกรดเฉลี่ย",
          type: "textfeild",
          value: row.grade,
        },
        {
          feild: "other",
          label: "ข้อมูลเพิ่มเติม",
          type: "textfeild",
          value: row.other,
        },
        {
          feild: "id",
          type: "textHidden",
          value: row.id,
        },
      ]);
      setFormStatus(true);
    } else if (type === "delete") {
      confirmAlert({
        title: "ยืนยันการลบข้อมูล ",
        message: 'คุณต้องการลบข้อมูล ชื่อสถานศึกษา" ' + row.cacademy_name + ' " ใช่หรือไม่ \n',
        buttons: [
          {
            label: "ใช่",
            onClick: () => {
              getData(token, { method: "delete", path: "/cr/education/" + row.id }, {}, (respon) => {
                formReset();
                setMessageSnack("ลบข้อมูลเสร็จสิ้น");
              });
            },
          },
          {
            label: "ไม่ใช่",
            onClick: () => "",
          },
        ],
      });
    }
  };

  return (
    <div>
      <Container className="py-3">
        {formStatus && editor && (
          <ComponentCrud
            objForm={objForm}
            onSubmit={(e) => crudSubmit(e)}
            cancelStatus={formStatus}
            onCancel={() => {
              setFormStatus(false);
              formReset();
            }}
          />
        )}
        {!formStatus && editor && (
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => setFormStatus(true)}>
                เพิ่มข้อมูล
              </Button>
            </Grid>
          </Grid>
        )}
        <DataTableMini
          handleAction={(type, row) => handleAction(type, row)}
          size={"medium"}
          rows={education}
          columns={columns}
          actions={editor?actions:[]}
        />
        {messageSnack && <SnackMessage message={messageSnack} onReset={() => setMessageSnack(null)} type="success" />}
      </Container>
    </div>
  );
}

Education.defaultProps = {
  editor: false,
};

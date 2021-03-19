import React, { useEffect, useState, useContext, useRef } from "react";
import { Container } from "reactstrap";
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
  { id: "course", label: "เรื่อง" },
  { id: "affiliation", label: "หน่วยงานที่จัดอบรม" },
  {
    id: "depart_training",
    label: "สถานที่จัดประชุม",
  },
  {
    id: "date_start",
    label: "วันที่เริ่ม",
    format: (value) => DateThai(value, "sortdate"),
  },
  {
    id: "date_end",
    label: "วันที่สิ้นสุด",
    format: (value) => DateThai(value, "sortdate"),
  },
  {
    id: "note",
    label: "เพิ่มเติม",
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

export default function Training({ person_id, editor }) {
  const [formStatus, setFormStatus] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");
  const [objForm, setObjForm] = useState([
    {
      feild: "course",
      label: "เรื่อง",
      type: "textfeild",
    },
    {
      feild: "affiliation",
      label: "หน่วยงานที่จัดอบรม",
      type: "textfeild",
    },
    {
      feild: "depart_training",
      label: "สถานที่จัดอบรม",
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
      feild: "note",
      label: "ข้อมูลเพิ่มเติม",
      type: "textfeild",
    },
  ]);
  const [training, setTraining] = useState([]);
  const { getData } = useContext(StateContext);
  const { token, user } = useContext(AuthContext);
  const mounted = useRef(null);

  const formReset = () => {
    setFormStatus(false);
    setObjForm([
      {
        feild: "course",
        label: "เรื่อง",
        type: "textfeild",
      },
      {
        feild: "affiliation",
        label: "หน่วยงานที่จัดอบรม",
        type: "textfeild",
      },
      {
        feild: "depart_training",
        label: "สถานที่จัดอบรม",
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
        feild: "note",
        label: "ข้อมูลเพิ่มเติม",
        type: "textfeild",
      },
    ]);
    getData(token, { method: "get", path: "/cr/training/" + person_id }, {}, (respon) => {
      if (respon.status === 200 && mounted.current) {
        setTraining(respon.data.results);
      } else if(mounted.current){
        setTraining([]);
      }
    });
  };

  useEffect(() => {
    mounted.current = true;
    getData(token, { method: "get", path: "/cr/training/" + person_id }, {}, (respon) => {
      if (respon.status === 200 && mounted.current) {
        setTraining(respon.data.results);
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
        { method: "patch", path: "/cr/training" },
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
        { method: "put", path: "/cr/training" },
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
          feild: "course",
          label: "เรื่อง",
          type: "textfeild",
          value: row.course,
        },
        {
          feild: "affiliation",
          label: "หน่วยงานที่จัดอบรม",
          type: "textfeild",
          value: row.affiliation,
        },
        {
          feild: "depart_training",
          label: "สถานที่จัดอบรม",
          type: "textfeild",
          value: row.depart_training,
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
          feild: "note",
          label: "ข้อมูลเพิ่มเติม",
          type: "textfeild",
          value: row.note,
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
              getData(token, { method: "delete", path: "/cr/training/" + row.id }, {}, (respon) => {
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
          rows={training}
          columns={columns}
          actions={actions}
        />
        {messageSnack && <SnackMessage message={messageSnack} onReset={() => setMessageSnack(null)} type="success" />}
      </Container>
    </div>
  );
}

Training.defaultProps = {
  editor: false,
};

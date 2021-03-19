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
  { id: "date", label: "วันที่ได้รับโทษ", format: (value) => DateThai(value, "sortdate") },
  { id: "cmd_no", label: "เลขที่คำสั่ง" },
  {
    id: "title",
    label: "เรื่อง",
  },
  {
    id: "panelty",
    label: "บทลงโทษที่ได้รับ",
  },
  {
    id: "panelty_down",
    label: "ได้รับการลดโทษ",
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

export default function Amnesty({ person_id, editor }) {
  const [formStatus, setFormStatus] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");
  const [objForm, setObjForm] = useState([
    {
      feild: "date",
      label: "วันที่ได้รับโทษ",
      type: "datePicker",
    },
    {
      feild: "cmd_no",
      label: "เลขที่คำสั่ง",
      type: "textfeild",
    },
    {
      feild: "title",
      label: "เรื่อง",
      type: "textfeild",
    },
    {
      feild: "panelty",
      label: "บทลงโทษที่ได้รับ",
      type: "textfeild",
    },
    {
      feild: "panelty_down",
      label: "ได้รับการลดโทษ",
      type: "textfeild",
    },
  ]);
  const [amnesty, setAmnesty] = useState([]);
  const { getData } = useContext(StateContext);
  const { token, user } = useContext(AuthContext);
  const mounted = useRef(null);

  useEffect(() => {
    mounted.current = true;
    getData(token, { method: "get", path: "/cr/amnesty/" + person_id }, {}, (respon) => {
      if (respon.status === 200 && mounted.current) {
        setAmnesty(respon.data.results);
      } else if(mounted.current) {
        setAmnesty([]);
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
        { method: "patch", path: "/cr/amnesty" },
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
        { method: "put", path: "/cr/amnesty" },
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
          feild: "date",
          label: "วันที่ได้รับโทษ",
          type: "datePicker",
          value: row.date,
        },
        {
          feild: "cmd_no",
          label: "เลขที่คำสั่ง",
          type: "textfeild",
          value: row.cmd_no,
        },
        {
          feild: "title",
          label: "เรื่อง",
          type: "textfeild",
          value: row.title,
        },
        {
          feild: "panelty",
          label: "บทลงโทษที่ได้รับ",
          type: "textfeild",
          value: row.panelty,
        },
        {
          feild: "panelty_down",
          label: "ได้รับการลดโทษ",
          type: "textfeild",
          value: row.panelty_down,
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
        message: 'คุณต้องการลบข้อมูล ใบประกอบวิชาชีพเลขที่" ' + row.license_no + ' " ใช่หรือไม่ \n',
        buttons: [
          {
            label: "ใช่",
            onClick: () => {
              getData(token, { method: "delete", path: "/cr/amnesty/" + row.id }, {}, (respon) => {
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

  const formReset = () => {
    setFormStatus(false);
    setObjForm([
      {
        feild: "date",
        label: "วันที่ได้รับโทษ",
        type: "datePicker",
      },
      {
        feild: "cmd_no",
        label: "เลขที่คำสั่ง",
        type: "textfeild",
      },
      {
        feild: "title",
        label: "เรื่อง",
        type: "textfeild",
      },
      {
        feild: "panelty",
        label: "บทลงโทษที่ได้รับ",
        type: "textfeild",
      },
      {
        feild: "panelty_down",
        label: "ได้รับการลดโทษ",
        type: "textfeild",
      },
    ]);

    getData(token, { method: "get", path: "/cr/amnesty/" + person_id }, {}, (respon) => {
      if (respon.status === 200 && mounted.current) {
        setAmnesty(respon.data.results);
      } else if(mounted.current){
        setAmnesty([]);
      }
    });
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
          rows={amnesty}
          columns={columns}
          actions={editor?actions:[]}
        />
        {messageSnack && <SnackMessage message={messageSnack} onReset={() => setMessageSnack(null)} type="success" />}
      </Container>
    </div>
  );
}

Amnesty.defaultProps = {
  editor: false,
};

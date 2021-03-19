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
  { id: "license", label: "ใบประกอบวิชาชีพ" },
  { id: "license_no", label: "เลขที่" },
  {
    id: "instit",
    label: "สถาบันที่ออก",
  },
  {
    id: "start_date",
    label: "ออกให้ ณ วันที่",
    format: (value) => DateThai(value, "sortdate"),
  },
  {
    id: "exp_date",
    label: "วันหมดอายุ",
    format: (value) => DateThai(value, "sortdate"),
  },
  {
    id: "renew",
    label: "ต่ออายุครั้งที่",
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

export default function Prolicense({ person_id, editor }) {
  const [formStatus, setFormStatus] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");
  const [objForm, setObjForm] = useState([
    {
      feild: "license",
      label: "ใบประกอบวิชาชีพ",
      type: "textfeild",
    },
    {
      feild: "license_no",
      label: "เลขที่",
      type: "textfeild",
    },
    {
      feild: "instit",
      label: "สถาบันที่ออก",
      type: "textfeild",
    },
    {
      feild: "start_date",
      label: "ออกให้ ณ วันที่",
      type: "datePicker",
    },
    {
      feild: "exp_date",
      label: "วันหมดอายุ",
      type: "datePicker",
    },
    {
      feild: "renew",
      label: "ต่ออายุครั้งที่",
      type: "textfeild",
    },
  ]);
  const [prolicense, setProlicense] = useState([]);
  const { getData } = useContext(StateContext);
  const { token, user } = useContext(AuthContext);
  const mounted = useRef(null);

  useEffect(() => {
    mounted.current = true;
    getData(token, { method: "get", path: "/cr/prolicense/" + person_id }, {}, (respon) => {
      if (respon.status === 200 && mounted.current) {
        setProlicense(respon.data.results);
      } else if(mounted.current){
        setProlicense([]);
      }
    });
    return () => {
      mounted.current = false;
    };
  }, [getData, person_id, token]);

  const crudSubmit = (e) => {
    if (e.prolicense_id) {
      getData(
        token,
        { method: "patch", path: "/cr/prolicense" },
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
        { method: "put", path: "/cr/prolicense" },
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
          feild: "license",
          label: "ใบประกอบวิชาชีพ",
          type: "textfeild",
          value: row.license,
        },
        {
          feild: "license_no",
          label: "เลขที่",
          type: "textfeild",
          value: row.license_no,
        },
        {
          feild: "instit",
          label: "สถาบันที่ออก",
          type: "textfeild",
          value: row.instit,
        },
        {
          feild: "start_date",
          label: "ออกให้ ณ วันที่",
          type: "datePicker",
          value: row.start_date,
        },
        {
          feild: "exp_date",
          label: "วันหมดอายุ",
          type: "datePicker",
          value: row.exp_date,
        },
        {
          feild: "renew",
          label: "ต่ออายุครั้งที่",
          type: "textfeild",
          value: row.renew,
        },
        {
          feild: "prolicense_id",
          type: "textHidden",
          value: row.prolicense_id,
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
              getData(token, { method: "delete", path: "/cr/prolicense/" + row.prolicense_id }, {}, (respon) => {
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
        feild: "license",
        label: "ใบประกอบวิชาชีพ",
        type: "textfeild",
      },
      {
        feild: "license_no",
        label: "เลขที่",
        type: "textfeild",
      },
      {
        feild: "instit",
        label: "สถาบันที่ออก",
        type: "textfeild",
      },
      {
        feild: "start_date",
        label: "ออกให้ ณ วันที่",
        type: "datePicker",
      },
      {
        feild: "exp_date",
        label: "วันหมดอายุ",
        type: "datePicker",
      },
      {
        feild: "renew",
        label: "ต่ออายุครั้งที่",
        type: "textfeild",
      },
    ]);

    getData(token, { method: "get", path: "/cr/prolicense/" + person_id }, {}, (respon) => {
      if (respon.status === 200 && mounted.current) {
        setProlicense(respon.data.results);
      } else if(mounted.current){
        setProlicense([]);
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
          rows={prolicense}
          columns={columns}
          actions={actions}
        />
        {messageSnack && <SnackMessage message={messageSnack} onReset={() => setMessageSnack(null)} type="success" />}
      </Container>
    </div>
  );
}

Prolicense.defaultProps = {
  editor: false,
};

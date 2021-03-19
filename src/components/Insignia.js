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
  { id: "insignia_name", label: "เครื่องราชอิสริยาภรณ์" },
  { id: "insignia_type", label: "ประเภทเครื่องราชอิสริยาภรณ์" },
  {
    id: "date_receive",
    label: "วันที่ได้รับ",
    format: (value) => DateThai(value, "sortdate"),
  },
  {
    id: "set_position",
    label: "ดำรงตำแหน่ง",
  },
  {
    id: "insignia_detail",
    label: "รายละเอียด",
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

export default function Insignia({ person_id, editor }) {
  const [formStatus, setFormStatus] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");
  const [objForm, setObjForm] = useState([
    {
      feild: "insignia_name",
      label: "เครื่องราชอิสริยาภรณ์",
      type: "textfeild",
    },
    {
      feild: "insignia_type",
      label: "ประเภทเครื่องราชอิสริยาภรณ์",
      type: "textfeild",
    },
    {
      feild: "date_receive",
      label: "วันที่ได้รับ",
      type: "datePicker",
    },
    {
      feild: "set_position",
      label: "ดำรงตำแหน่ง",
      type: "textfeild",
    },
    {
      feild: "insignia_detail",
      label: "รายละเอียด",
      type: "textfeild",
    },
  ]);
  const [insignia, setInsignia] = useState([]);
  const { getData } = useContext(StateContext);
  const { token, user } = useContext(AuthContext);
  const mounted = useRef(null);

  useEffect(() => {
    mounted.current = true;
    getData(token, { method: "get", path: "/cr/insignia/" + person_id }, {}, (respon) => {
      if (respon.status === 200 && mounted.current) {
        setInsignia(respon.data.results);
      } else if(mounted.current){
        setInsignia([]);
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
        { method: "patch", path: "/cr/insignia" },
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
        { method: "put", path: "/cr/insignia" },
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
          feild: "insignia_name",
          label: "เครื่องราชอิสริยาภรณ์",
          type: "textfeild",
          value: row.insignia_name,
        },
        {
          feild: "insignia_type",
          label: "ประเภทเครื่องราชอิสริยาภรณ์",
          type: "textfeild",
          value: row.insignia_type,
        },
        {
          feild: "date_receive",
          label: "วันที่ได้รับ",
          type: "datePicker",
          value: row.date_receive,
        },
        {
          feild: "set_position",
          label: "ดำรงตำแหน่ง",
          type: "textfeild",
          value: row.set_position,
        },
        {
          feild: "insignia_detail",
          label: "รายละเอียด",
          type: "textfeild",
          value: row.insignia_detail,
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
              getData(token, { method: "delete", path: "/cr/insignia/" + row.id }, {}, (respon) => {
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
        feild: "insignia_name",
        label: "เครื่องราชอิสริยาภรณ์",
        type: "textfeild",
      },
      {
        feild: "insignia_type",
        label: "ประเภทเครื่องราชอิสริยาภรณ์",
        type: "textfeild",
      },
      {
        feild: "date_receive",
        label: "วันที่ได้รับ",
        type: "datePicker",
      },
      {
        feild: "set_position",
        label: "ดำรงตำแหน่ง",
        type: "textfeild",
      },
      {
        feild: "insignia_detail",
        label: "รายละเอียด",
        type: "textfeild",
      },
    ]);

    getData(token, { method: "get", path: "/cr/insignia/" + person_id }, {}, (respon) => {
      if (respon.status === 200 && mounted.current) {
        setInsignia(respon.data.results);
      } else if(mounted.current){
        setInsignia([]);
      }
    });
  };

  return (
    <div>
      <Container className="py-3">
        {formStatus && editor &&  (
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
          rows={insignia}
          columns={columns}
          actions={actions}
        />
        {messageSnack && <SnackMessage message={messageSnack} onReset={() => setMessageSnack(null)} type="success" />}
      </Container>
    </div>
  );
}

Insignia.defaultProps = {
  editor: false,
};

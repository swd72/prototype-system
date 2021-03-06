import React, { useEffect, useState, useContext, useRef } from "react";
import { Container } from "reactstrap";
import { confirmAlert } from "react-confirm-alert";
import ComponentCrud from "../components/ComponentCrud";
import { AuthContext } from "../provider/AuthProvider";
import { StateContext } from "../provider/StateProvider";
import DataTableMini from "./DataTableMini";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import SnackMessage from "./SnackMessage";

const columns = [
  { id: "address", label: "ที่อยู่" },
  { id: "tambonname", label: "ตำบล" },
  {
    id: "ampurname",
    label: "อำเภอ",
  },
  {
    id: "provname",
    label: "จังหวัด",
  },
  {
    id: "zip_code",
    label: "รหัสไปรษณีย์",
  },
  {
    id: "note",
    label: "หมายเหตุ",
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

export default function Address({ person_id, editor }) {
  const [formStatus, setFormStatus] = useState(false);
  const [objForm, setObjForm] = useState([
    {
      feild: "address",
      label: "ที่อยู่",
      type: "textfeild",
    },
    {
      feild: "f_address",
      label: "f_address",
      type: "addressFeild",
    },
    {
      feild: "note",
      label: "หมายเหตุ",
      type: "textfeild",
    },
  ]);
  const [address, setAddress] = useState([]);
  const [messageSnack, setMessageSnack] = useState("");

  const { getData } = useContext(StateContext);
  const { token, user } = useContext(AuthContext);
  const mounted = useRef(null);

  const formReset = () => {
    setFormStatus(false);
    setObjForm([
      {
        feild: "address",
        label: "ที่อยู่",
        type: "textfeild",
      },
      {
        feild: "f_address",
        label: "f_address",
        type: "addressFeild",
      },
      {
        feild: "note",
        label: "หมายเหตุ",
        type: "textfeild",
      },
    ]);
    getData(token, { method: "get", path: "/cr/address/" + person_id }, {}, (respon) => {
      if (respon.status === 200 && mounted.current) {
        setAddress(respon.data.results);
      } else if (mounted.current) {
        setAddress([]);
      }
    });
  };

  useEffect(() => {
    mounted.current = true;
    getData(token, { method: "get", path: "/cr/address/" + person_id }, {}, (respon) => {
      if (respon.status === 200 && mounted.current) {
        setAddress(respon.data.results);
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
        { method: "patch", path: "/cr/address" },
        { ...e, person_id, action_id: user.person_id },
        (respon) => {
          if (respon.status === 200 && mounted.current) {
            formReset();
            setMessageSnack("อัพเดทข้อมูลสำเร็จ");
          }
        }
      );
    } else {
      getData(
        token,
        { method: "put", path: "/cr/address" },
        { ...e, person_id, action_id: user.person_id },
        (respon) => {
          if (respon.status === 200 && mounted.current) {
            formReset();
            setMessageSnack("เพิ่มข้อมูลสำเร็จ");
          }
        }
      );
    }
  };

  const handleAction = (type, row) => {
    if (type === "edit") {
      setObjForm([
        {
          feild: "address",
          label: "ที่อยู่",
          type: "textfeild",
          value: row.address,
        },
        {
          feild: "f_address",
          label: "f_address",
          type: "addressFeild",
          value: {
            prov_code: row.prov_code,
            ampur_code: row.ampur_code,
            tambon_code: row.tambon_code,
            zip_code: row.zip_code,
          },
        },
        {
          feild: "note",
          label: "หมายเหตุ",
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
        message: 'คุณต้องการลบข้อมูล ที่อยู่" ' + row.address + ' " ใช่หรือไม่ \n',
        buttons: [
          {
            label: "ใช่",
            onClick: () => {
              getData(token, { method: "delete", path: "/cr/address/" + row.id }, {}, (respon) => {
                formReset();
                setMessageSnack("ลบข้อมูลสำเร็จ");
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
          rows={address}
          columns={columns}
          actions={editor?actions:[]}
        />
        {messageSnack && <SnackMessage message={messageSnack} onReset={() => setMessageSnack(null)} type="success" />}
      </Container>
    </div>
  );
}

Address.defaultProps = {
  editor: false,
};

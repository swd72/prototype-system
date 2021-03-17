import React, { useEffect, useState, useContext, useRef } from "react";
import { Container } from "reactstrap";
import ComponentCrud from "../components/ComponentCrud";
import { AuthContext } from "../provider/AuthProvider";
import { StateContext } from "../provider/StateProvider";
import DataTableMini from "./DataTableMini";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";

const columns = [
  { id: "address", label: "ที่อยู่", minWidth: 170 },
  { id: "tambonname", label: "ตำบล", minWidth: 100 },
  {
    id: "ampurname",
    label: "อำเภอ",
    minWidth: 170,
  },
  {
    id: "provname",
    label: "จังหวัด",
    minWidth: 170,
  },
  {
    id: "zip_code",
    label: "รหัสไปรษณีย์",
    minWidth: 170,
  },
  {
    id: "note",
    label: "หมายเหตุ",
    minWidth: 170,
  },
];

const actions = [
  {
    type: "edit",
    label: "แก้ไข",
    color: "inherit",
    icon: <DeleteIcon />,
  },
  {
    type: "delete",
    label: "ลบ",
    color: "secondary",
    icon: <DeleteIcon />,
  },
];

export default function Address(props) {
  const person_id = 802;
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
  }, [getData, token]);

  const crudSubmit = (e) => {
    if (e.id) {
      getData(
        token,
        { method: "patch", path: "/cr/address" },
        { ...e, person_id, action_id: user.person_id },
        (respon) => {
          if (respon.status === 200 && mounted.current) {
            console.log(respon.data);
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
            console.log(respon.data);
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
    }
  };

  return (
    <div>
      <Container className="py-3">
        {formStatus && (
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
        {!formStatus && (
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
          actions={actions}
        />
      </Container>
    </div>
  );
}

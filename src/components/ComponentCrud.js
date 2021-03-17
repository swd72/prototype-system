import React, { useState } from "react";
import { Form, Container, FormGroup } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AutocompleteRedux from "./AutocompleteRedux";
import { useSelector } from "react-redux";

const ComponentCrud = ({ objForm, onSubmit, onCancel, cancelStatus }) => {
  const [addressObject, setAddressObject] = useState({});
  const { handleSubmit, control, errors, setValue } = useForm();
  const cprovince = useSelector((state) => state.cprovince);
  const campur = useSelector((state) => state.campur);
  const ctambon = useSelector((state) => state.ctambon);

  const onSubmitFirstForm = (values) => {
    onSubmit(values);
  };

  const _getAmpur = (obj, idx) => {
    let r_obj = [];
    for (var i in obj) {
      if (String(obj[i].changwatcode) === String(idx)) {
        r_obj.push(obj[i]);
      }
    }
    return r_obj;
  };

  const _getTambon = (obj, idx) => {
    let r_obj = [];
    for (var i in obj) {
      if (String(obj[i].ampurcode) === String(idx)) {
        r_obj.push(obj[i]);
      }
    }
    return r_obj;
  };

  const getFeild = (val, idx, value) => {
    let _return;
    switch (val.type) {
      case "textfeild":
        _return = (
          <FormGroup key={`formFeild${idx}`}>
            <Controller
              as={TextField}
              name={val.feild}
              control={control}
              defaultValue={value || ""}
              label={val.label}
              fullWidth={true}
              variant="outlined"
              size="small"
              error={errors[val.feild] ? true : false}
              helperText={errors[val.feild] ? errors[val.feild].message : ""}
            />
          </FormGroup>
        );
        break;
      case "addressFeild":
        _return = (
          <Grid container spacing={2} key={`formFeild${idx}`}>
            <Grid item sm={3}>
              <FormGroup>
                <Controller
                  as={TextField}
                  name={"province"}
                  control={control}
                  defaultValue={value?.prov_code || ""}
                  label={"จังหวัด"}
                  hidden
                />
                <AutocompleteRedux
                  id="prov_code"
                  onChange={(e) => {
                    setValue("province", value?.prov_code || "");
                    setAddressObject((p) => ({
                      ...p,
                      province: e?.value || "",
                      ampur: "",
                      tambon: "",
                    }));
                  }}
                  valueDefault={value?.prov_code}
                  options={cprovince}
                  label="จังหวัด"
                />
              </FormGroup>
            </Grid>
            <Grid item sm={3}>
              <FormGroup>
                <Controller
                  as={TextField}
                  name={"ampur"}
                  control={control}
                  defaultValue={value?.ampur_code || ""}
                  label={"อำเภอ"}
                  hidden
                />
                <AutocompleteRedux
                  id="ampur_code"
                  onChange={(e) => {
                    setValue("ampur", value?.ampur_code || "");
                    setAddressObject((p) => ({
                      ...p,
                      ampur: e?.value || "",
                      tambon: "",
                    }));
                  }}
                  valueDefault={value?.ampur_code}
                  options={_getAmpur(campur, addressObject.province || value?.prov_code)}
                  label="อำเภอ"
                />
              </FormGroup>
            </Grid>
            <Grid item sm={3}>
              <FormGroup>
                <Controller
                  as={TextField}
                  name={"tambon"}
                  control={control}
                  defaultValue={value?.tambon_code || ""}
                  label={"ตำบล"}
                  hidden
                />
                <AutocompleteRedux
                  id="tambon_code"
                  onChange={(e) => {
                    setValue("tambon", value?.tambon_code || "");
                    setAddressObject((p) => ({
                      ...p,
                      tambon: e?.value || "",
                    }));
                  }}
                  valueDefault={value?.tambon_code}
                  options={_getTambon(ctambon, addressObject.ampur || value?.ampur_code)}
                  label="ตำบล"
                />
              </FormGroup>
            </Grid>
            <Grid item sm={3}>
              <FormGroup>
                <Controller
                  as={TextField}
                  name={"zipcode"}
                  control={control}
                  defaultValue={value?.zip_code || ""}
                  variant="outlined"
                  size="small"
                  label={"รหัสไปรษณีย์"}
                />
              </FormGroup>
            </Grid>
          </Grid>
        );
        break;
      case "textHidden":
        _return = (
          <FormGroup key={`formFeild${idx}`}>
            <Controller
              as={TextField}
              name={val.feild}
              control={control}
              defaultValue={value || ""}
              label={val.label}
              hidden
            />
          </FormGroup>
        );
        break;
      default:
        break;
    }
    return _return;
  };

  return (
    <Container style={{ backgroundColor: "rgb(212, 230, 241)" }} className="p-3">
      <Form onSubmit={handleSubmit((data) => onSubmitFirstForm(data))}>
        {objForm.map((val, idx) => getFeild(val, idx, val.value))}

        <Grid container justify="center" spacing={2}>
          <Grid item>
            {cancelStatus && (
              <Button variant="contained" color="secondary" onClick={onCancel}>
                ยกเลิก
              </Button>
            )}{" "}
            <Button variant="contained" color="primary" type="submit">
              บันทึกข้อมูล
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
};
export default ComponentCrud;

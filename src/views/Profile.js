import React from "react";
import Button from "@material-ui/core/Button";
import { Form, FormGroup, Label, Container } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
// import { ErrorMessage } from "@hookform/error-message";
// import FormHelperText from '@material-ui/core/FormHelperText';

const schema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": `กรุณากรอกข้อมูล`,
  }),
  fname: Joi.string().required().messages({
    "string.empty": `กรุณากรอกข้อมูล`,
  }),
  lname: Joi.number().messages({
    "number.base": `กรอกข้อมูลเป็นตัวเลขเท่านั้น`,
  }),
});

export default function FullScreenDialog(props) {
  const { handleSubmit, control, errors } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmitFirstForm = async (values) => {
    console.log({ variables: { ...values } });
  };

  return (
    <div>
      <Container className="py-3">
        <div>
          <Form onSubmit={handleSubmit((data) => onSubmitFirstForm(data))}>
            <Container className="py-3">
              <FormGroup>
                <Controller
                  as={TextField}
                  name={"username"}
                  control={control}
                  defaultValue=""
                  label={"ชื่อผู้ใช้งาน"}
                  fullWidth={true}
                  variant="outlined"
                  size="small"
                  error={errors.username ? true : false}
                  helperText={errors.username ? errors.username.message : ""}
                />
              </FormGroup>

              <FormGroup>
                <Controller
                  as={TextField}
                  name={"fname"}
                  control={control}
                  defaultValue=""
                  label={"ชื่อ"}
                  fullWidth={true}
                  variant="outlined"
                  size="small"
                  error={errors.fname ? true : false}
                  helperText={errors.fname ? errors.fname.message : ""}
                />
              </FormGroup>

              <FormGroup>
                <Controller
                  as={TextField}
                  name={"lname"}
                  control={control}
                  defaultValue=""
                  label={"นามสกุล"}
                  fullWidth={true}
                  variant="outlined"
                  size="small"
                  error={errors.lname ? true : false}
                  helperText={errors.lname ? errors.lname.message : ""}
                />
              </FormGroup>

              <FormGroup>
                <Label for="userTypes">ประเภทผู้ใช้ &nbsp;&nbsp;</Label>
                <Chip
                  avatar={<Avatar>{"G"}</Avatar>}
                  key={"chip"}
                  label={"val2.user_type_name"}
                  clickable
                  color="primary"
                  variant="outlined"
                />
              </FormGroup>

              <FormGroup>
                <Label for="userWork">งานที่บันทึกข้อมูล &nbsp;&nbsp;</Label>
              </FormGroup>

              <Button variant="contained" color="primary" type="submit">
                บันทึกข้อมูล
              </Button>
            </Container>
          </Form>
        </div> 
      </Container>
    </div>
  );
}

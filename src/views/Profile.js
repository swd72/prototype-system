import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { Form, FormGroup, Label, Input, Container } from "reactstrap";
import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import { StateContext } from "../provider/StateProvider";

const dark_style = {
  backgroundColor: "#303030",
  borderBottom: "85888C 1px",
  color: "#FFFFFF",
};
export default function FullScreenDialog(props) {
  // const token = useSelector((state) => state.token);

  const { register, handleSubmit } = useForm({});
  const { styleMode } = useContext(StateContext);

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
                <Label for="username">ชื่อผู้ใช้งาน</Label>
                <Input
                  style={styleMode === "dark" ? dark_style : {}}
                  name="username"
                  innerRef={register}
                  disabled
                />
              </FormGroup>

              <FormGroup>
                <Label for="fname">ชื่อ</Label>
                <Input
                  style={styleMode === "dark" ? dark_style : {}}
                  name="fname"
                  innerRef={register}
                />
              </FormGroup>

              <FormGroup>
                <Label for="lname">นามสกุล</Label>
                <Input
                  style={styleMode === "dark" ? dark_style : {}}
                  name="lname"
                  innerRef={register}
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

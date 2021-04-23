import React, { useEffect, useContext, useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import { Form, FormGroup, Container } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Skeleton from "@material-ui/lab/Skeleton";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import DatePicker from "./DatePicker";
import AutocompleteAsync from "./AutocompleteAsync";
import AutocompleteRedux from "./AutocompleteRedux";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
import { calcAge } from "../functions";
import { useSelector } from "react-redux";
import { StateContext } from "../provider/StateProvider";

export default function PersonalInformation(props) {
  const { person_id } = props;
  const [resultsObject, setResultsObject] = useState({});
  const [departObject, setDepartObject] = useState({});
  const { refresh_token, server_url, token } = useContext(AuthContext);
  const { _getWorkgroup, _getWork } = useContext(StateContext);
  const { handleSubmit, control, errors, setValue } = useForm();
  const [snackMessage, setSnackMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);

  const moute_ = useRef(null);

  const missiongroup_option = useSelector((state) => state.missiongroup_option);
  const workgroup_option = useSelector((state) => state.workgroup_option);
  const cwork_option = useSelector((state) => state.cwork_option);

  const { control: control2, setValue: setValue2, getValues: getValues2 } = useForm();

  const onSubmitFirstForm = async (loop_token, values) => {
    // console.log({ variables: { ...values } }, getValues2());
    axios
      .post(
        `${server_url}/person/update_person`,
        {
          ...getValues2(),
          ...values,
        },
        {
          headers: { authorization: `Bear ${loop_token || token}` },
        }
      )
      .then((rs) => {
        if (rs.status === 200 && moute_.current) {
          setSnackMessage("บันทึกข้อมูลสำเร็จ");
          setSnackOpen(true);
        } else if (rs.status === 204) {
        }
      })
      .catch(async (error) => {
        if (error.response?.status === 400 || error.response?.status === 401) {
          refresh_token((cal) => {
            if (cal.token) {
              onSubmitFirstForm(cal.token, values);
            }
          });
        }
      });
  };

  useEffect(() => {
    moute_.current = true;
    getData();
    return () => {
      moute_.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = (loop_token) => {
    // console.log(person_id);
    axios
      .post(
        `${server_url}/person/getoneperson`,
        {
          person_id: person_id,
        },
        {
          headers: { authorization: `Bear ${loop_token || token}` },
        }
      )
      .then((rs) => {
        if (rs.status === 200 && moute_.current) {
          const data_results = rs.data.results;
          setResultsObject(data_results);
          setValue("prename", data_results.prename || "");
          setValue("fname", data_results.fname || "");
          setValue("lname", data_results.lname || "");
          setValue("cid", data_results.cid || "");
          setValue("sex", data_results.sex || "");
          setValue("bloodgroup", data_results.bloodgroup || "");
          setValue("birthdate", data_results.birthdate || "");
          setValue("religion", data_results.religion || "");
          setValue("mstatus", data_results.mstatus || "");
          setValue("father_name", data_results.father_name || "");
          setValue("mother_name", data_results.mother_name || "");
          setValue("person_id", data_results.person_id);

          setValue("packup_date", data_results.packup_date || "");
          setValue("startwork_date", data_results.startwork_date || "");
          setValue("retire_date", data_results.retire_date || "");
          setValue("endwork_date", data_results.endwork_date || "");

          setValue("missiongroup", data_results.missiongroup || "");
          setValue("workgroup", data_results.workgroup || "");
          setValue("cwork", data_results.cwork || "");

          setDepartObject({
            missiongroup: data_results.missiongroup || "",
            workgroup: data_results.workgroup || "",
            cwork: data_results.cwork || "",
          });

          setValue2("position", data_results.position || "");
          setValue2("position_type", data_results.position_type || "");
          setValue2("worklevel", data_results.worklevel || "");
          setValue2("officer", data_results.officer || "");
          setValue2("person_id_one", data_results.person_id_one);
        } else if (rs.status === 204) {
        }
      })
      .catch(async (error) => {
        if (error.response?.status === 400 || error.response?.status === 401) {
          refresh_token((cal) => {
            if (cal.token) {
              getData(cal.token);
            }
          });
        }
      });
  };

  const handleCloseSnack = () => {
    setSnackOpen(false);
  };

  return (
    <div>
      <Container className="py-3">
        <div>
          <Form onSubmit={handleSubmit((data) => onSubmitFirstForm(null, data))}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4}>
                <FormGroup>
                  <Controller as={TextField} name={"person_id"} control={control} defaultValue="" hidden />
                  <Controller
                    as={TextField}
                    name={"prename"}
                    control={control}
                    defaultValue=""
                    label={"คำนำหน้า"}
                    hidden
                  />
                  {resultsObject.person_id ? (
                    <AutocompleteAsync
                      id={"prename"}
                      onChange={(e) => setValue("prename", e?.value || "")}
                      valueDefault={resultsObject.prename}
                      api_uri={"/c/prename"}
                      label="คำนำหน้า"
                    />
                  ) : (
                    <Skeleton height={45} />
                  )}
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={4}>
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
              </Grid>
              <Grid item xs={12} sm={4}>
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
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormGroup>
                  <Controller
                    as={TextField}
                    name={"cid"}
                    control={control}
                    disabled={true}
                    defaultValue=""
                    label={"รหัสบัตรประชาชน"}
                    fullWidth={true}
                    variant="outlined"
                    size="small"
                    error={errors.cid ? true : false}
                    helperText={errors.cid ? errors.cid.message : ""}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={8}>
                <FormGroup style={{ marginBottom: 0 }}>
                  <InputLabel>วัน / เดือน / ปีเกิด</InputLabel>
                  <Controller
                    as={TextField}
                    name={"birthdate"}
                    control={control}
                    defaultValue=""
                    label={"วัน / เดือน / ปีเกิด"}
                    hidden
                  />
                  {resultsObject.birthdate ? (
                    <DatePicker
                      onSelect={(e) => {
                        setValue("birthdate", `${e.year}-${e.month}-${e.days}`);
                      }}
                      startYear={2021 - 65}
                      endYear={new Date().getFullYear()}
                      defaultDate={resultsObject.birthdate}
                    />
                  ) : (
                    <DatePicker
                      onSelect={(e) => {
                        setValue("birthdate", `${e.year}-${e.month}-${e.days}`);
                      }}
                      startYear={2021 - 65}
                      endYear={new Date().getFullYear()}
                    />
                  )}
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={4}>
                <h5>
                  <strong className="badge badge-danger">
                    อายุ : {calcAge(resultsObject.birthdate ? resultsObject.birthdate : "")}
                  </strong>
                </h5>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl variant="outlined" size="small">
                  <InputLabel id="demo-simple-select-outlined-label">เพศ</InputLabel>
                  <Controller
                    as={
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="เพศ"
                        name="days"
                        size="small"
                        style={{ width: "100%" }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>ชาย</MenuItem>
                        <MenuItem value={2}>หญิง</MenuItem>
                      </Select>
                    }
                    name={"sex"}
                    control={control}
                    defaultValue=""
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl variant="outlined" size="small">
                  <InputLabel id="demo-simple-select-outlined-label">หมู่เลือด</InputLabel>
                  <Controller
                    as={
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="หมู่เลือด"
                        name="bloodgroup"
                        size="small"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"O"}>O</MenuItem>
                        <MenuItem value={"A"}>A</MenuItem>
                        <MenuItem value={"B"}>B</MenuItem>
                        <MenuItem value={"AB"}>AB</MenuItem>
                      </Select>
                    }
                    name={"bloodgroup"}
                    control={control}
                    defaultValue=""
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormGroup>
                  <Controller
                    as={TextField}
                    name={"religion"}
                    control={control}
                    defaultValue=""
                    label={"ศาสนา"}
                    hidden
                  />
                  {resultsObject.person_id ? (
                    <AutocompleteAsync
                      id={"religion"}
                      onChange={(e) => setValue("religion", e?.value || "")}
                      valueDefault={resultsObject.religion}
                      api_uri={"/c/religion"}
                      label="ศาสนา"
                    />
                  ) : (
                    <Skeleton height={45} />
                  )}
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormGroup>
                  <Controller
                    as={TextField}
                    name={"mstatus"}
                    control={control}
                    defaultValue=""
                    label={"สถานะสมรส"}
                    hidden
                  />
                  {resultsObject.person_id ? (
                    <AutocompleteAsync
                      id={"mstatus"}
                      onChange={(e) => setValue("mstatus", e?.value || "")}
                      valueDefault={resultsObject.mstatus}
                      api_uri={"/c/mstatus"}
                      label="สถานะสมรส"
                    />
                  ) : (
                    <Skeleton height={45} />
                  )}
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormGroup>
                  <Controller
                    as={TextField}
                    name={"father_name"}
                    control={control}
                    defaultValue=""
                    label={"ชื่อบิดา"}
                    fullWidth={true}
                    variant="outlined"
                    size="small"
                    error={errors.father_name ? true : false}
                    helperText={errors.father_name ? errors.father_name.message : ""}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormGroup>
                  <Controller
                    as={TextField}
                    name={"mother_name"}
                    control={control}
                    defaultValue=""
                    label={"ชื่อมารดา"}
                    fullWidth={true}
                    variant="outlined"
                    size="small"
                    error={errors.mother_name ? true : false}
                    helperText={errors.mother_name ? errors.mother_name.message : ""}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormGroup style={{ marginBottom: 0 }}>
                  <InputLabel> วันที่บรรจุ / วันที่เริ่มทำงาน</InputLabel>
                  <Controller
                    as={TextField}
                    name={"packup_date"}
                    control={control}
                    defaultValue={resultsObject.packup_date || ""}
                    label={"รหัสบัตรประชาชน"}
                    hidden
                  />
                  {resultsObject.packup_date ? (
                    <DatePicker
                      onSelect={(e) => {
                        setValue("packup_date", `${e.year}-${e.month}-${e.days}`);
                      }}
                      startYear={2021 - 65}
                      endYear={new Date().getFullYear()}
                      defaultDate={resultsObject.packup_date}
                      disabled={true}
                    />
                  ) : (
                    <DatePicker
                      onSelect={(e) => {
                        setValue("packup_date", `${e.year}-${e.month}-${e.days}`);
                      }}
                      startYear={2021 - 65}
                      endYear={new Date().getFullYear()}
                      disabled={true}
                    />
                  )}
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormGroup style={{ marginBottom: 0 }}>
                  <InputLabel> วันที่เข้าสู่ตำแหน่งปัจจุบัน</InputLabel>
                  <Controller
                    as={TextField}
                    name={"startwork_date"}
                    control={control}
                    defaultValue=""
                    label={"วันที่เข้าสู่ตำแหน่งปัจจุบัน"}
                    hidden
                  />

                  {resultsObject.startwork_date ? (
                    <DatePicker
                      onSelect={(e) => {
                        setValue("startwork_date", `${e.year}-${e.month}-${e.days}`);
                      }}
                      startYear={2021 - 65}
                      endYear={new Date().getFullYear()}
                      defaultDate={resultsObject.startwork_date}
                      disabled={true}
                    />
                  ) : (
                    <DatePicker
                      onSelect={(e) => {
                        setValue("startwork_date", `${e.year}-${e.month}-${e.days}`);
                      }}
                      startYear={2021 - 65}
                      endYear={new Date().getFullYear()}
                      disabled={true}
                    />
                  )}
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormGroup style={{ marginBottom: 0 }}>
                  <InputLabel> วันที่เกษียณ</InputLabel>
                  <Controller
                    as={TextField}
                    name={"retire_date"}
                    control={control}
                    defaultValue=""
                    label={"วันที่เกษียณ"}
                    hidden
                  />

                  {resultsObject.retire_date ? (
                    <DatePicker
                      onSelect={(e) => {
                        setValue("retire_date", `${e.year}-${e.month}-${e.days}`);
                      }}
                      startYear={2021 - 65}
                      endYear={new Date().getFullYear() + 45}
                      defaultDate={resultsObject.retire_date}
                      disabled={true}
                    />
                  ) : (
                    <DatePicker
                      onSelect={(e) => {
                        setValue("retire_date", `${e.year}-${e.month}-${e.days}`);
                      }}
                      startYear={2021 - 65}
                      endYear={new Date().getFullYear() + 45}
                      disabled={true}
                    />
                  )}
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormGroup style={{ marginBottom: 0 }}>
                  <InputLabel> วันที่สิ้นสุดการทำงาน</InputLabel>
                  <Controller
                    as={TextField}
                    name={"endwork_date"}
                    control={control}
                    defaultValue=""
                    label={"วันที่สิ้นสุดการทำงาน"}
                    hidden
                  />

                  {resultsObject.endwork_date ? (
                    <DatePicker
                      onSelect={(e) => {
                        setValue("endwork_date", `${e.year}-${e.month}-${e.days}`);
                      }}
                      startYear={2021 - 65}
                      endYear={new Date().getFullYear() + 5}
                      defaultDate={resultsObject.endwork_date}
                      disabled={true}
                    />
                  ) : (
                    <DatePicker
                      onSelect={(e) => {
                        setValue("endwork_date", `${e.year}-${e.month}-${e.days}`);
                      }}
                      startYear={2021 - 65}
                      endYear={new Date().getFullYear() + 5}
                      disabled={true}
                    />
                  )}
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormGroup>
                  <Controller
                    as={TextField}
                    name={"missiongroup"}
                    control={control}
                    defaultValue=""
                    label={"กลุ่มภารกิจ"}
                    hidden
                  />
                  {resultsObject.person_id ? (
                    <AutocompleteRedux
                      id={"missiongroup"}
                      onChange={(e) => {
                        setValue("missiongroup", e?.value || "");
                        setDepartObject((p) => ({
                          ...p,
                          missiongroup: e?.value || "",
                          workgroup: "",
                          cwork: "",
                        }));
                      }}
                      valueDefault={parseInt(resultsObject.missiongroup || 0)}
                      options={missiongroup_option}
                      label="กลุ่มภารกิจ"
                    />
                  ) : (
                    <Skeleton height={45} />
                  )}
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormGroup>
                  <Controller
                    as={TextField}
                    name={"workgroup"}
                    control={control}
                    defaultValue=""
                    label={"กลุ่มงาน"}
                    hidden
                  />
                  {resultsObject.person_id ? (
                    <AutocompleteRedux
                      id={"workgroup"}
                      onChange={(e) => {
                        setValue("workgroup", e?.value || "");
                        setDepartObject((p) => ({
                          ...p,
                          workgroup: e?.value || "",
                          cwork: "",
                        }));
                      }}
                      valueDefault={resultsObject.workgroup || ""}
                      options={_getWorkgroup(
                        workgroup_option,
                        departObject.missiongroup ? departObject.missiongroup : "9"
                      )}
                      label="กลุ่มงาน"
                    />
                  ) : (
                    <Skeleton height={45} />
                  )}
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormGroup>
                  <Controller as={TextField} name={"cwork"} control={control} defaultValue="" label={"งาน"} hidden />
                  {resultsObject.person_id ? (
                    <AutocompleteRedux
                      id={"cwork"}
                      onChange={(e) => {
                        setValue("cwork", e?.value || "");
                        setDepartObject((p) => ({
                          ...p,
                          cwork: e?.value || "",
                        }));
                      }}
                      valueDefault={resultsObject.cwork || ""}
                      options={_getWork(
                        cwork_option,
                        departObject.missiongroup ? departObject.missiongroup + "" + departObject.workgroup : "9"
                      )}
                      label="งาน"
                    />
                  ) : (
                    <Skeleton height={45} />
                  )}
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormGroup>
                  <Controller as={TextField} name={"person_id_one"} control={control2} defaultValue="" hidden />
                  <Controller
                    as={TextField}
                    name={"position"}
                    control={control2}
                    defaultValue=""
                    label={"ตำแหน่ง"}
                    hidden
                  />
                  {resultsObject.person_id ? (
                    <AutocompleteAsync
                      id={"position"}
                      onChange={(e) => setValue2("position", e?.value || "")}
                      valueDefault={resultsObject.position}
                      api_uri={"/c/position"}
                      label="ตำแหน่ง"
                    />
                  ) : (
                    <Skeleton height={45} />
                  )}
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormGroup>
                  <Controller
                    as={TextField}
                    name={"position_type"}
                    control={control2}
                    defaultValue=""
                    label={"ประเภทตำแหน่ง"}
                    hidden
                  />
                  {resultsObject.person_id ? (
                    <AutocompleteAsync
                      id={"position_type"}
                      onChange={(e) => setValue2("position_type", e?.value || "")}
                      valueDefault={resultsObject.position_type}
                      api_uri={"/c/position_type"}
                      label="ประเภทตำแหน่ง"
                    />
                  ) : (
                    <Skeleton height={45} />
                  )}
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormGroup>
                  <Controller
                    as={TextField}
                    name={"worklevel"}
                    control={control2}
                    defaultValue=""
                    label={"ระดับ"}
                    hidden
                  />
                  {resultsObject.person_id ? (
                    <AutocompleteAsync
                      id={"worklevel"}
                      onChange={(e) => setValue2("worklevel", e?.value || "")}
                      valueDefault={resultsObject.worklevel}
                      api_uri={"/c/level"}
                      label="ระดับ"
                    />
                  ) : (
                    <Skeleton height={45} />
                  )}
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormGroup>
                  <Controller
                    as={TextField}
                    name={"officer"}
                    control={control2}
                    defaultValue=""
                    label={"ประเภทเจ้าหน้าที่"}
                    hidden
                  />
                  {resultsObject.person_id ? (
                    <AutocompleteAsync
                      id={"officer"}
                      onChange={(e) => setValue2("officer", e?.value || "")}
                      valueDefault={resultsObject.officer}
                      api_uri={"/c/officer"}
                      label="ประเภทเจ้าหน้าที่"
                    />
                  ) : (
                    <Skeleton height={45} />
                  )}
                </FormGroup>
              </Grid>
              <Grid item sm={12}>
                <Button variant="contained" color="primary" type="submit">
                  บันทึกข้อมูล
                </Button>
              </Grid>
            </Grid>
          </Form>
        </div>

        <Snackbar
          open={snackOpen}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={6000}
          onClose={handleCloseSnack}
        >
          <Alert elevation={6} variant="filled" onClose={handleCloseSnack} severity={true ? "success" : "error"}>
            {" "}
            {snackMessage}{" "}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}

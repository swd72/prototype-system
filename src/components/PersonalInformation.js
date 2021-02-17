import React, { useEffect, useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import { Form, FormGroup, Label, Container } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import DatePicker from "./DatePicker";
import AutocompleteAsync from "./AutocompleteAsync";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import { calcAge } from "../functions";

export default function PersonalInformation(props) {
  const [resultsObject, setResultsObject] = useState({});
  const { refresh_token, server_url, token, user } = useContext(AuthContext);
  const { handleSubmit, control, errors, setValue } = useForm();
  const {
    control: control2,
    errors: errors2,
    setValue: setValue2,
    getValues: getValues2,
  } = useForm();

  const onSubmitFirstForm = async (values) => {
    console.log({ variables: { ...values } }, getValues2());
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getData(loop_token) {
    axios
      .post(
        `${server_url}/person/getoneperson`,
        {
          person_id: user.person_id,
        },
        {
          headers: { authorization: `Bear ${loop_token || token}` },
        }
      )
      .then((rs) => {
        if (rs.status === 200) {
          const data_results = rs.data.results;
          setResultsObject(data_results);
          setValue("prename", data_results.cprename_name);
          setValue("fname", data_results.fname);
          setValue("lname", data_results.lname);
          setValue("cid", data_results.cid);
          setValue("sex", data_results.sex);
          setValue("bloodgroup", data_results.bloodgroup);
          setValue("birthdate", data_results.birthdate);
          setValue("religion", data_results.religion);
          setValue("mstatus", data_results.mstatus);
          setValue("father_name", data_results.father_name);
          setValue("mother_name", data_results.mother_name);

          setValue("packup_date", data_results.packup_date || "");
          setValue("startwork_date", data_results.startwork_date || "");
          setValue("retire_date", data_results.retire_date || "");
          setValue("endwork_date", data_results.endwork_date || "");

          setValue("missiongroup", data_results.missiongroup || "");
          setValue("workgroup", data_results.workgroup || "");
          setValue("cwork", data_results.cwork || "");

          setValue2("position", data_results.position || "");
          setValue2("position_type", data_results.position_type || "");
          setValue2("level", data_results.level || "");
          setValue2("officer", data_results.officer || "");
          // setRows(rs.data.results);
          // setTotalCount(
          //   rs.data.results.length > 0 ? rs.data.results[0].xtotal : 0
          // );
        } else if (rs.status === 204) {
        }
      })
      .catch(async (error) => {
        if (error.response.status === 400 || error.response.status === 401) {
          refresh_token((cal) => {
            getData(cal.token);
          });
        }
      });
  }

  return (
    <div>
      <Container className="py-3">
        <div>
          <Form onSubmit={handleSubmit((data) => onSubmitFirstForm(data))}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4}>
                <FormGroup>
                  <Controller
                    as={TextField}
                    name={"prename"}
                    control={control}
                    defaultValue=""
                    label={"คำนำหน้า"}
                    fullWidth={true}
                    variant="outlined"
                    size="small"
                    error={errors.prename ? true : false}
                    helperText={errors.prename ? errors.prename.message : ""}
                  />
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
                      endYear="2021"
                      defaultDate={resultsObject.birthdate}
                    />
                  ) : (
                    <DatePicker
                      onSelect={(e) => {
                        setValue("birthdate", `${e.year}-${e.month}-${e.days}`);
                      }}
                      startYear={2021 - 65}
                      endYear="2021"
                    />
                  )}
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={4}>
                <h5>
                  <strong className="badge badge-danger">
                    อายุ :{" "}
                    {calcAge(
                      resultsObject.birthdate ? resultsObject.birthdate : ""
                    )}
                  </strong>
                </h5>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormGroup>
                  <Controller
                    as={TextField}
                    name={"sex"}
                    control={control}
                    defaultValue=""
                    label={"เพศ"}
                    fullWidth={true}
                    variant="outlined"
                    size="small"
                    error={errors.sex ? true : false}
                    helperText={errors.sex ? errors.sex.message : ""}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormGroup>
                  <Controller
                    as={TextField}
                    name={"bloodgroup"}
                    control={control}
                    defaultValue=""
                    label={"หมู่เลือด"}
                    fullWidth={true}
                    variant="outlined"
                    size="small"
                    error={errors.bloodgroup ? true : false}
                    helperText={
                      errors.bloodgroup ? errors.bloodgroup.message : ""
                    }
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormGroup>
                  <Controller
                    as={TextField}
                    name={"religion"}
                    control={control}
                    defaultValue=""
                    label={"ศาสนา"}
                    fullWidth={true}
                    variant="outlined"
                    size="small"
                    error={errors.religion ? true : false}
                    helperText={errors.religion ? errors.religion.message : ""}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormGroup>
                  <Controller
                    as={TextField}
                    name={"mstatus"}
                    control={control}
                    defaultValue=""
                    label={"ศาสนา"}
                    fullWidth={true}
                    variant="outlined"
                    size="small"
                    error={errors.mstatus ? true : false}
                    helperText={errors.mstatus ? errors.mstatus.message : ""}
                  />
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
                    helperText={
                      errors.father_name ? errors.father_name.message : ""
                    }
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
                    helperText={
                      errors.mother_name ? errors.mother_name.message : ""
                    }
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
                        setValue(
                          "packup_date",
                          `${e.year}-${e.month}-${e.days}`
                        );
                      }}
                      startYear={2021 - 65}
                      endYear="2021"
                      defaultDate={resultsObject.packup_date}
                    />
                  ) : (
                    <DatePicker
                      onSelect={(e) => {
                        setValue(
                          "packup_date",
                          `${e.year}-${e.month}-${e.days}`
                        );
                      }}
                      startYear={2021 - 65}
                      endYear="2021"
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
                        setValue(
                          "startwork_date",
                          `${e.year}-${e.month}-${e.days}`
                        );
                      }}
                      startYear={2021 - 65}
                      endYear="2021"
                      defaultDate={resultsObject.startwork_date}
                    />
                  ) : (
                    <DatePicker
                      onSelect={(e) => {
                        setValue(
                          "startwork_date",
                          `${e.year}-${e.month}-${e.days}`
                        );
                      }}
                      startYear={2021 - 65}
                      endYear="2021"
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
                        setValue(
                          "retire_date",
                          `${e.year}-${e.month}-${e.days}`
                        );
                      }}
                      startYear={2021 - 65}
                      endYear="2021"
                      defaultDate={resultsObject.retire_date}
                    />
                  ) : (
                    <DatePicker
                      onSelect={(e) => {
                        setValue(
                          "retire_date",
                          `${e.year}-${e.month}-${e.days}`
                        );
                      }}
                      startYear={2021 - 65}
                      endYear="2021"
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
                        setValue(
                          "endwork_date",
                          `${e.year}-${e.month}-${e.days}`
                        );
                      }}
                      startYear={2021 - 65}
                      endYear="2021"
                      defaultDate={resultsObject.endwork_date}
                    />
                  ) : (
                    <DatePicker
                      onSelect={(e) => {
                        setValue(
                          "endwork_date",
                          `${e.year}-${e.month}-${e.days}`
                        );
                      }}
                      startYear={2021 - 65}
                      endYear="2021"
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
                    fullWidth={true}
                    variant="outlined"
                    size="small"
                    error={errors.missiongroup ? true : false}
                    helperText={
                      errors.missiongroup ? errors.missiongroup.message : ""
                    }
                  />
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
                    fullWidth={true}
                    variant="outlined"
                    size="small"
                    error={errors.workgroup ? true : false}
                    helperText={
                      errors.workgroup ? errors.workgroup.message : ""
                    }
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormGroup>
                  <Controller
                    as={TextField}
                    name={"cwork"}
                    control={control}
                    defaultValue=""
                    label={"งาน"}
                    fullWidth={true}
                    variant="outlined"
                    size="small"
                    error={errors.cwork ? true : false}
                    helperText={errors.cwork ? errors.cwork.message : ""}
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormGroup>
                  <AutocompleteAsync onChange={(e) => console.log(e)} />
                  {/* <Controller
                    as={TextField}
                    name={"position"}
                    control={control2}
                    defaultValue=""
                    label={"ตำแหน่ง"}
                    fullWidth={true}
                    variant="outlined"
                    size="small"
                    error={errors2.position ? true : false}
                    helperText={
                      errors2.position ? errors2.position.message : ""
                    }
                  /> */}
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
                    fullWidth={true}
                    variant="outlined"
                    size="small"
                    error={errors2.position_type ? true : false}
                    helperText={
                      errors2.position_type ? errors2.position_type.message : ""
                    }
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormGroup>
                  <Controller
                    as={TextField}
                    name={"level"}
                    control={control2}
                    defaultValue=""
                    label={"ระดับ"}
                    fullWidth={true}
                    variant="outlined"
                    size="small"
                    error={errors2.level ? true : false}
                    helperText={errors2.level ? errors2.level.message : ""}
                  />
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
                    fullWidth={true}
                    variant="outlined"
                    size="small"
                    error={errors2.officer ? true : false}
                    helperText={errors2.officer ? errors2.officer.message : ""}
                  />
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
      </Container>
    </div>
  );
}

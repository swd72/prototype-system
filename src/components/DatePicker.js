import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { defaultProps } from "default-props";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import range from "lodash/range";
import getYear from "date-fns/getYear";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function DatePicker(props) {
  const { onSelect, startYear, endYear, defaultDate, ref, disabled } = props;

  const classes = useStyles();
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [days, setDays] = useState(null);
  const [daysOptions, setDaysOptions] = useState([]);

  useEffect(() => {
    if (defaultDate) {
      const s_default_date = defaultDate.split("-");
      setYear(parseInt(s_default_date[0]));
      setMonth(parseInt(s_default_date[1]));
      setDays(parseInt(s_default_date[2]));
    } else {
      setYear("");
      setMonth("");
      setDays("");
    }
  }, [defaultDate]);

  useEffect(() => {
    if (year && month && days) onSelect({ year, month, days });
  }, [year, month, days, onSelect]);

  useEffect(() => {
    if (year && month) {
      var d = new Date(year, month, 0);
      setDaysOptions(range(1, d.getDate() + 1, 1));
    }
  }, [year, month, startYear, endYear]);

  const yearsOptions = range(
    getYear(new Date(startYear + "-01-01")),
    getYear(new Date(endYear + "-01-01")) + 1,
    1
  ).reverse();

  const monthOptions = [
    { value: 1, label: "มกราคม" },
    { value: 2, label: "กุมภาพันธ์" },
    { value: 3, label: "มีนาคม" },
    { value: 4, label: "เมษายน" },
    { value: 5, label: "พฤษภาคม" },
    { value: 6, label: "มิถุนายน" },
    { value: 7, label: "กรกฎาคม" },
    { value: 8, label: "สิงหาคม" },
    { value: 9, label: "กันยายม" },
    { value: 10, label: "ตุลาคม" },
    { value: 11, label: "พฤศจิกายน" },
    { value: 12, label: "ธันวาคม" },
  ];

  const handleChange = (e) => {
    if (e.target.name === "year") {
      setYear(e.target.value);
    } else if (e.target.name === "month") {
      setMonth(e.target.value);
    } else if (e.target.name === "days") {
      setDays(e.target.value);
    }
  };
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item>
          <FormControl
            variant="outlined"
            size="small"
            className={classes.formControl}
          >
            <InputLabel id="demo-simple-select-outlined-label">ปี</InputLabel>
            <Select
              ref={ref}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={year || ""}
              onChange={handleChange}
              label="ปี"
              name="year"
              size="small"
              disabled={disabled}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {yearsOptions.map((val, idx) => (
                <MenuItem key={`yearOption${idx}`} value={val}>
                  {val + 543}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl
            variant="outlined"
            size="small"
            className={classes.formControl}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              เดือน
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={month || ""}
              onChange={handleChange}
              label="เดือน"
              name="month"
              size="small"
              disabled={disabled}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {monthOptions.map((val, idx) => (
                <MenuItem key={`monthOption${idx}`} value={val.value}>
                  {val.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl
            variant="outlined"
            size="small"
            className={classes.formControl}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              วันที่
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={days || ""}
              onChange={handleChange}
              label="วันที่"
              name="days"
              size="small"
              disabled={disabled}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {daysOptions.map((val, idx) => (
                <MenuItem key={`dayOption${idx}`} value={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

DatePicker.propTypes = {
  onSelect: PropTypes.func.isRequired,
  startYear: PropTypes.any.isRequired,
  endYear: PropTypes.any.isRequired,
  defaultDate: PropTypes.string,
};

DatePicker.defaultProps = {
  disabled: false,
};

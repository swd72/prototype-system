import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import Skeleton from "@material-ui/lab/Skeleton";

export default function AutocompleteRedux({ onChange, valueDefault, options, label, id }) {
  const [open, setOpen] = useState(false);
  const loading = open && options.length === 0;

  return (options || []).length > 0 ? (
    <Autocomplete
      id={"asynchronous-demo"+id}
      style={{ minWidth: 200 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event, values) => {
        onChange(values);
      }}
      defaultValue={options.find((val) => val.value === valueDefault)}
      getOptionSelected={(option, value) => option.label === value.label}
      getOptionLabel={(option) => option.label}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          size={"small"}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  ) : (
    <Skeleton height={45} />
  );
}

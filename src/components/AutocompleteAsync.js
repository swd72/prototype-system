import fetch from "cross-fetch";
import React, { useEffect, useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { AuthContext } from "../provider/AuthProvider";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function AutocompleteAsync({ onChange }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [defaultValue, setDefaultValue] = useState({});
  const loading = open && options.length === 0;
  const { server_url, token } = useContext(AuthContext);

  useEffect(() => {
    let active = true;

    (async () => {
      const response = await fetch(`${server_url}/c/position`, {
        method: "get",
        headers: new Headers({
          Authorization: "Bear " + token,
        }),
      });
      await sleep(1e3); // For demo purposes.
      const options = await response.json();
      setDefaultValue(options.results.find((e) => e.value === 10));
      console.log(options.results.find((e) => e.value === 10));
      if (active) {
        setOptions(options.results);
      }
    })();
    return () => {
      active = false;
    };
  }, [loading, server_url, token]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ minWidth: 100 }}
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
      defaultValue={defaultValue.value || null}
      value={defaultValue.value ? defaultValue.value : " "}
      getOptionSelected={(option, value) => option.label === value.label}
      getOptionLabel={(option) => option.label}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
          variant="outlined"
          size={"small"}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

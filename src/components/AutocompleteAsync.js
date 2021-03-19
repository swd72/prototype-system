import fetch from "cross-fetch";
import React, { useEffect, useState, useContext, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { AuthContext } from "../provider/AuthProvider";

export default function AutocompleteAsync({ onChange, valueDefault, api_uri, label, id }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [defaultValue, setDefaultValue] = useState({});
  const loading = open && options.length === 0;
  const { server_url } = useContext(AuthContext);
  const mouted_ = useRef(null);

  useEffect(() => {
    mouted_.current = true;
    getAsync();
    return () => {
      mouted_.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAsync = async () => {
    setOptions([]);
    const response = await fetch(`${server_url}${api_uri}`, {
      method: "get",
    });
    const options = await response.json();

    if (mouted_.current) {
      setDefaultValue(options.results?.find((e) => e.value === valueDefault));
      setOptions(options.results);
    }
  };

  return (options || []).length > 0 ? (
    <Autocomplete
      id={"asynchronous-demo"+id}
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
      defaultValue={defaultValue?.value ? defaultValue : null}
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
  ) : null;
}

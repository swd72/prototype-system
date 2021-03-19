import React, { useEffect, useState, useRef } from "react";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

export default function SnackMessage({ message, type, onReset }) {
  const [snackMessage, setSnackMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [snackOpen, setSnackOpen] = useState(false);
  const mounted = useRef(null);

  useEffect(() => {
    mounted.current = true;
    if (mounted.current) {
      setSnack(message, type);
    }
    return () => (mounted.current = false);
  }, [message, type]);

  const handleCloseSnack = () => {
    onReset();
    setSnackOpen(false);
  };

  const setSnack = (message, type) => {
    if (message) {
      setSnackMessage(message);
      setSeverity(type || "success");
      setSnackOpen(true);
    }
  };

  return (
    <Snackbar
      open={snackOpen}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={6000}
      onClose={handleCloseSnack}
    >
      <Alert variant="filled" onClose={handleCloseSnack} severity={severity}>
        {" "}
        {snackMessage}{" "}
      </Alert>
    </Snackbar>
  );
}

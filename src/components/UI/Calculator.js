import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import getResult from "../../Utils/get_result";
import ButtonBox from "../Button/ButtonBox";
import classes from "./Calculator.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";

function Calculator() {
  const [equation, setEquation] = React.useState("");
  const [calculateResult, setCalculateResult] = React.useState(0);
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const changeEquationHanlder = (event) => {
    setEquation(event.target.value);
  };

  const resetButtonHanlder = (event) => {
    setShowErrorMessage(false);
    setEquation("");
    setErrorMessage("");
    setIsLoading(false);
    setCalculateResult(0);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    calculateHandler(event);
  };

  const buttonOnClickHandler = (event) => {
    const value = event.target.value;
    if (value === "=") {
      calculateHandler();
    } else if (value === "CL") {
      resetButtonHanlder();
    } else if (value === "DEL") {
      deleteButtonHandler();
    } else {
      value === "X"
        ? setEquation(equation + "*")
        : setEquation(equation + value);
    }
  };

  const deleteButtonHandler = (event) => {
    setEquation(equation.slice(0, -1));
  };

  const calculateHandler = async (event) => {
    setShowErrorMessage(false);
    setIsLoading(true);
    const result = await getResult(equation);
    setIsLoading(false);
    if (result.result || result.result === 0) {
      setShowErrorMessage(false);
      setCalculateResult(result.result);
    }
    if (result.Error) {
      setErrorMessage(result.Error);
      setShowErrorMessage(true);

      setTimeout(() => {
        setShowErrorMessage(false);
      }, 5000);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper
          elevation={20}
          sx={{ bgcolor: "rgba(255,250,250,0.05)", borderRadius: "5%" }}
        >
          <h1 style={{ color: "#1976d2" }}>Calculator</h1>
          <form onSubmit={onSubmitHandler}>
            <TextField
              onChange={changeEquationHanlder}
              value={equation}
              sx={{
                fontSize: "3rem",
                backgroundColor: "rgba(255,255,255,0.4)",
                boxShadow: "2",
                width: "90%",
              }}
              id="outlined-basic"
              label="Equation"
              variant="outlined"
            />
          </form>
          <div className={classes.div}>
            <TextField
              id="outlined-read-only-input"
              label="Result"
              sx={{
                backgroundColor: "rgba(255,255,255,0.4)",
                boxShadow: "2",
                width: "90%",
              }}
              value={calculateResult}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "65px",
            }}
          >
            {showErrorMessage && (
              <Alert sx={{ margin: "0 0", width: "90%" }} severity="error">
                {errorMessage}
              </Alert>
            )}
            {isLoading && <CircularProgress />}
          </div>

          <Box
            className={classes.buttonBox}
            sx={{
              height: "50vh",
              width: "90%",
              marginTop: "10px",
            }}
          >
            <ButtonBox onClick={buttonOnClickHandler} />
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default Calculator;

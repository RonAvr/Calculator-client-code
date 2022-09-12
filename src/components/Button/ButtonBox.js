import Button from "@mui/material/Button";
import classes from "./Button.module.css";

const btnValues = [
  [7, 8, 9, "X"],
  [4, 5, 6, "/"],
  [1, 2, 3, "+"],
  ["A", "0", "DEL", "-"],
  ["Z", "CL", "="],
];

function ButtonBox(props) {
  return btnValues.flat().map((btn, i) => {
    return (
      <Button
        variant="text"
        aria-label="outlined primary button group"
        key={i}
        onClick={props.onClick}
        value={btn}
        sx={{ fontSize:"1.3rem",borderRadius: "15px", boxShadow: "2px 2px 5px #888888" }}
        className={
          btn === "="
            ? classes.equals
            : classes.button
        }
      >
        {btn}
      </Button>
    );
  });
}

export default ButtonBox;

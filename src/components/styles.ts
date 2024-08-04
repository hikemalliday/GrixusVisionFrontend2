export const labelProps = {
  sx: {
    color: "white",
    padding: 0,
    margin: 0,
    fontSize: "small",
    "@media (max-width: 300px)": {
      marginLeft: "50px",
    },
  },
};

export const signInInputStyles = {
  "& .MuiFilledInput-root": {
    color: "white",
    fontFamily: "Arial",
    fontWeight: "bold",
    backgroundColor: "#3c3c3c",
    borderTopLeftRadius: "7px",
    borderTopRightRadius: "7px",
    width: "500px",
    marginTop: "10px",
    "@media (max-width: 600px)": {
      width: "300px",
    },
    "@media (max-width: 400px)": {
      width: "200px",
    },
  },
  "& .MuiInputLabel-filled": {
    color: "white",
    fontWeight: "bold",
  },
};

export const signInButtonStyles = {
  color: "white",
  fontFamily: "Arial",
  fontWeight: "bold",
  backgroundColor: "black",
  borderTopLeftRadius: "7px",
  borderTopRightRadius: "7px",
  width: "500px",
  marginTop: "10px",
  "@media (max-width: 600px)": {
    width: "300px",
  },
  "@media (max-width: 400px)": {
    width: "200px",
  },
};

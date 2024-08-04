import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useSignUp } from "../hooks/requests";
import { useAuthContext } from "../context/AuthContext";
import { signInInputStyles, signInButtonStyles } from "./styles";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const { mutateAsync } = useSignUp();

  const handleSignup = async (): Promise<void> => {
    try {
      const data = await mutateAsync({ username, password });
      console.log(data);
      login(data);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="login-container">
      SIGNUP
      <TextField
        variant="filled"
        sx={signInInputStyles}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        variant="filled"
        sx={signInInputStyles}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <Button sx={signInButtonStyles} onClick={handleSignup}>
        SUBMIT
      </Button>
    </div>
  );
};

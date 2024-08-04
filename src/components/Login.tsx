import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useLogin } from "../hooks/requests";
import { useAuthContext } from "../context/AuthContext";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const { mutateAsync, error: loginError } = useLogin();

  const handleLogin = async (): Promise<void> => {
    try {
      const { data } = await mutateAsync({ username, password });
      login(data);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      LOGIN
      <TextField onChange={(e) => setUsername(e.target.value)} />
      <TextField onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>SUBMIT</Button>
      {/* @ts-ignore*/}
      {loginError && <div> {loginError?.response?.data.detail}</div>}
    </div>
  );
};

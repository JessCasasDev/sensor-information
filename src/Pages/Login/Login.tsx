import { useState } from "react";
import { useAuthContext } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormGroup,
  TextField,
} from "@mui/material";

const Login = () => {
  const { login } = useAuthContext();
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onLogin = () => {
    if (input.email && input.password) {
      login(input).then(() => {
        navigate("/sensor");
      }).catch(e => console.log(e));
    }
  };

  const onHandleInput = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box sx={{ mb: 5 }} component="img" alt="Logo" src={"/logo.png"} />

      <Box width={"80%"}>
        <FormGroup sx={{ width: "100%" }}>
          <TextField
            label="Email"
            id="email"
            name="email"
            onChange={onHandleInput}
            sx={{my: 2}}
          />
          <TextField
            label="Password"
            id="password"
            name="password"
            type="password"
            onChange={onHandleInput}
            sx={{my: 2}}

          />
          <Button
            sx={{ my: 3 }}
            variant={"contained"}
            type="submit"
            onClick={onLogin}
          >
            Log In
          </Button>          
        </FormGroup>
      </Box>
    </Container>
  );
};

export default Login;

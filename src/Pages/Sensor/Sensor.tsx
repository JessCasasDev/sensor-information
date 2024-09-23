import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CommanderInfo } from "../../Utils/interfaces";
import { Commander } from "./Commander";

export function Sensor() {
  const [commanderInfo, setCommanderInfo] = useState([] as CommanderInfo[]);

  const { token, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const stagingURL = process.env.REACT_APP_stagingURL;
  const EncodedDeviceID = "mreqDBvHOa49v";

  useEffect(() => {
    async function req() {
      if (!token) return;
      const commander = await axios.get(
        `${stagingURL}/api/commander/cloudConnectID/${EncodedDeviceID}`
      );
      const response = await axios.get(
        `${stagingURL}/api/sensordata/${commander.data.uuid}?start=1720994400000&end=1721016000000`
      );
      const commanderInfo: CommanderInfo[] = response.data.filter(
        (data: any) => data.channel === "F01"
      );
      setCommanderInfo(commanderInfo);
    }
    if (token) {
      req();
    }
  }, [token, stagingURL]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Sensor Information
          </Typography>
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          width: "100vw",
        }}
      >
        {commanderInfo.length === 0 && <CircularProgress />}
        {commanderInfo.length > 0 && <Commander commanders={commanderInfo} />}
      </Container>
    </>
  );
}

export default Sensor;

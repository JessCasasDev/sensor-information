import {
  Box,
  Container,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { CommanderInfo } from "../../Utils/interfaces";
import { useEffect, useState } from "react";
import { Chart } from "./Chart";

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);

  return `${date.toTimeString().split(" ")[0].slice(0, -3)}`;
};

export const Commander = (props: { commanders: CommanderInfo[] }) => {
  const commanders = props.commanders;
  const [sensorData, setSensorData] = useState(
    [] as { name: string; value: number }[]
  );
  const [selectedCommanderInfo, setSelectedCommanderInfo] = useState(
    {} as CommanderInfo
  );

  useEffect(() => {
    selectCommander(commanders[0]);
  }, [commanders]);

  const selectCommanderHandler = (ev: any) => {
    const commander = commanders.find(
      (commander) => commander.controlunitName === ev.target.value
    );
    if (commander) selectCommander(commander);
  };

  const selectCommander = (info: CommanderInfo) => {
    setSelectedCommanderInfo(info);
    const data: { name: string; value: number }[] = info.values.map(
      (data: any) => {
        return {
          name: formatDate(data.timestamp),
          value: data.value,
        };
      }
    );

    setSensorData(data);
  };

  return (
    <div>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="h6" sx={{ mr: 5, mb:3 }} component="div">
          Select a commander
        </Typography>
        <Select
          defaultValue={props.commanders[0].controlunitName}
          label="Select Commander"
          onChange={selectCommanderHandler}
          sx={{ mb: 3 }}
        >
          {commanders.map((opt: CommanderInfo) => (
            <MenuItem value={opt.controlunitName}>
              {opt.controlunitName}
            </MenuItem>
          ))}
        </Select>
      </Container>
      <Paper elevation={3} sx={{ paddingX: 8, paddingY: 5 }}>
        <Typography variant="h5" sx={{ mb: 5 }} component="div">
          {selectedCommanderInfo.controlunitName}
        </Typography>
        <Box width={"80%"}>
          <Chart data={sensorData} />
        </Box>
      </Paper>
    </div>
  );
};

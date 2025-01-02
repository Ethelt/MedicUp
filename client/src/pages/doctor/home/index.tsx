import { Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { DoctorContext } from "../../../context/DoctorContext";

export default function DoctorHome() {
  const doctor = useContext(DoctorContext);

  return (
    <Stack>
      <Typography variant="h2">DoctorHome</Typography>
      <Typography variant="h3">
        {doctor?.firstName} {doctor?.lastName}
      </Typography>
    </Stack>
  );
}

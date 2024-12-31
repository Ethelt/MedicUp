import { Stack, Typography } from "@mui/material";
import { Outlet } from "react-router";

export default function PatientLayout() {
  return (
    <Stack>
      <Typography variant="h1">Patient</Typography>
      <Outlet />
    </Stack>
  );
}

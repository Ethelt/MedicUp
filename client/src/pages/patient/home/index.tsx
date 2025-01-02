import { Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { PatientContext } from "../../../context/PatientContext";

export default function PatientHome() {
  const patient = useContext(PatientContext);

  return (
    <Stack>
      <Typography variant="h2">PatientHome</Typography>
      <Typography variant="h3">
        {patient?.firstName} {patient?.lastName}
      </Typography>
    </Stack>
  );
}

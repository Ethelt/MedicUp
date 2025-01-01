import { Stack, Typography } from "@mui/material";
import { usePatient } from "../PatientLayout";

export default function PatientHome() {
  const patient = usePatient();

  return (
    <Stack>
      <Typography variant="h2">PatientHome</Typography>
      <Typography variant="h3">
        {patient?.firstName} {patient?.lastName}
      </Typography>
    </Stack>
  );
}

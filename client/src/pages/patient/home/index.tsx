import { Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { PatientContext } from "../../../context/PatientContext";
import PatientCalendar from "./PatientCalendar";

export default function PatientHome() {
  const { patient } = useContext(PatientContext);

  if (!patient) return null;

  return (
    <Stack height="100%">
      <Typography variant="h2">PatientHome</Typography>
      <PatientCalendar patient={patient} />
    </Stack>
  );
}

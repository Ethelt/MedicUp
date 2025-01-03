import { ApiRoutes, Patient } from "@medicup/shared";
import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { Api } from "../../api";
import { AppRoutes } from "../../constants/AppRoutes";
import { PatientContext } from "../../context/PatientContext";

export default function PatientLayout() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      const response = await Api.get<undefined, Patient>(
        ApiRoutes.patient.me,
        undefined
      );
      if (response.ok) {
        setPatient(response.data);
      } else {
        // @TODO: better error handling
        navigate(AppRoutes.auth.login.patient);
      }
    };
    fetchPatient();
  }, [navigate]);

  return (
    <PatientContext.Provider value={{patient}}>
      <Stack height="100%">
        <Typography variant="h1">Patient</Typography>
        <Outlet />
      </Stack>
    </PatientContext.Provider>
  );
}

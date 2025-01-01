import { ApiRoutes, Patient } from "@medicup/shared";
import { Stack, Typography } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { Api } from "../../api";
import { AppRoutes } from "../../constants/AppRoutes";

const PatientContext = createContext<Patient | null>(null);

export const usePatient = () => useContext(PatientContext);

export default function PatientLayout() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      const response = await Api.get<undefined, Patient>(
        ApiRoutes.patients.me,
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
  }, []);

  return (
    <PatientContext.Provider value={patient}>
      <Stack>
        <Typography variant="h1">Patient</Typography>
        <Outlet />
      </Stack>
    </PatientContext.Provider>
  );
}

import { ApiRoutes, Patient } from "@medicup/shared";
import { Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { Api } from "../../api";
import { AppRoutes } from "../../constants/AppRoutes";
import { PatientContext } from "../../context/PatientContext";

// @Task: zrobienie ładnego headera z nawigacją do różnych stron pacjenta
// wystarczy edytować tylko jedno miejsce w tym pliku, jest komentarz gdzie

export default function PatientLayout() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const navigate = useNavigate();

  // tym się nie przejmuj
  const fetchPatient = useCallback(async () => {
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
  }, [navigate]);

  // tym się nie przejmuj
  useEffect(() => {
    fetchPatient();
  }, [fetchPatient]);

  return (
    // tym Context tez się nie przejmuj
    <PatientContext.Provider value={{ patient, refresh: fetchPatient }}>
      <Stack height="100%">
        {/* wystarczy zedytować tylko ten Stack*/}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding={2}
        >
          <Typography variant="h6">Daj tu logo</Typography>
          <Stack direction="row" gap={2}>
            <Typography variant="h6">
              <Link to={AppRoutes.patient.home}>Home</Link>
            </Typography>
            <Typography variant="h6">
              <Link to={AppRoutes.patient.profile}>Profile</Link>
            </Typography>
          </Stack>
        </Stack>
        <Outlet />
      </Stack>
    </PatientContext.Provider>
  );
}

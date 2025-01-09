import { ApiRoutes, Doctor } from "@medicup/shared";
import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { Api } from "../../api";
import { AppRoutes } from "../../constants/AppRoutes";
import { DoctorContext } from "../../context/DoctorContext";

export default function DoctorLayout() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      const response = await Api.get<undefined, Doctor>(
        ApiRoutes.doctor.me,
        undefined
      );
      if (response.ok) {
        setDoctor(response.data);
      } else {
        // @TODO: better error handling
        navigate(AppRoutes.auth.login.doctor);
      }
    };
    fetchPatient();
  }, [navigate]);

  return (
    <DoctorContext.Provider value={{ doctor }}>
      <Stack height="100%">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          p={2}
        >
          <Typography variant="h5">Doctor</Typography>
        </Stack>
        <Outlet />
      </Stack>
    </DoctorContext.Provider>
  );
}

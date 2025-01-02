import { ApiRoutes, Registrar } from "@medicup/shared";
import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { Api } from "../../api";
import { AppRoutes } from "../../constants/AppRoutes";
import { RegistrarContext } from "../../context/RegistrarContext";

export default function RegistrarLayout() {
  const [registrar, setRegistrar] = useState<Registrar | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      const response = await Api.get<undefined, Registrar>(
        ApiRoutes.registrars.me,
        undefined
      );
      if (response.ok) {
        setRegistrar(response.data);
      } else {
        // @TODO: better error handling
        navigate(AppRoutes.auth.login.registrar);
      }
    };
    fetchPatient();
  }, [navigate]);

  return (
    <RegistrarContext.Provider value={registrar}>
      <Stack>
        <Typography variant="h1">Registrar</Typography>
        <Outlet />
      </Stack>
    </RegistrarContext.Provider>
  );
}

import { useNavigate } from "react-router";
import { AppRoutes } from "../constants/AppRoutes";
import { useEffect } from "react";
import { Typography } from "@mui/material";

export default function App() {
  const navigate = useNavigate();

  // @TODO: add proper redirect
  useEffect(() => {
    navigate(AppRoutes.auth.login);
  }, []);

  return <Typography variant="h1">Waiting for redirect...</Typography>;
}

import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { AppRoutes } from "../constants/AppRoutes";

export default function App() {
  const navigate = useNavigate();

  // @TODO: add proper redirect
  useEffect(() => {
    navigate(AppRoutes.welcome);
  }, [navigate]);

  return <Typography variant="h1">Waiting for redirect...</Typography>;
}

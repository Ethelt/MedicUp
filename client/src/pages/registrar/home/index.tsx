import { Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { RegistrarContext } from "../../../context/RegistrarContext";

export default function RegistrarHome() {
  const registrar = useContext(RegistrarContext);

  return (
    <Stack>
      <Typography variant="h2">RegistrarHome</Typography>
      <Typography variant="h3">{registrar?.login}</Typography>
    </Stack>
  );
}

import { Stack } from "@mui/material";
import { Outlet } from "react-router";

export default function AuthLayout() {
  // @TODO: add proper layout here
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
    >
      <Outlet />
    </Stack>
  );
}

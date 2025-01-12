import { Box, Stack, Typography } from "@mui/material";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
      spacing={4}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          width: "100%",
        }}
      >
        {/* Text centered horizontally */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#4a75ff",
            textAlign: "center",
            margin: "0 auto",
          }}
        >
          MedicUp
        </Typography>
      </Box>

      {/* Content Section */}
      <Outlet />
    </Stack>
  );
}

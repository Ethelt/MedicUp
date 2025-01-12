import { Box, Stack, Typography } from "@mui/material";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
      spacing={2}
    >
      {/* Header Section */}
      <Stack direction="row" alignItems="center" spacing={2}>
        {/* Logo */}
        <Box
          component="div"
          sx={{
            width: 60,
            height: 60,
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 193 229"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                style={{
                  fill: "#3765ff",
                  fillOpacity: 1,
                  strokeWidth: 0.264583,
                }}
                d="M 0.3001292,75.380593 H 37.953427 L 57.972755,0.667449 109.93747,194.60242 138.49254,88.03344 h 55.06891 v 7.71067 H 145.53428 L 109.69998,229.47956 57.942579,36.318323 45.251496,83.68209 H 0.3001292 Z"
              />
            </g>
          </svg>
        </Box>

        {/* Text centered horizontally */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#4a75ff",
          }}
        >
          MedicUp
        </Typography>

        {/* Div to the right of the text, equal to the width of the logo */}
        <Box
          component="div"
          sx={{
            width: 60,
            height: 1,
          }}
        />
      </Stack>

      {/* Content Section */}
      <Outlet />
    </Stack>
  );
}

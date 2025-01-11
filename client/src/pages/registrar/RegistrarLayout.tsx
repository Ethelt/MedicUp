import { ApiRoutes, Registrar } from "@medicup/shared";
import { Instagram, LinkedIn, Twitter, YouTube } from "@mui/icons-material";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
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
        ApiRoutes.registrar.me,
        undefined
      );
      if (response.ok) {
        setRegistrar(response.data);
      } else {
        navigate(AppRoutes.auth.login.registrar);
      }
    };
    fetchPatient();
  }, [navigate]);

  const handleLogout = () => {
    // Usuń tokeny lub inne dane autoryzacyjne
    Api.post(ApiRoutes.auth.logout, undefined).finally(() => {
      navigate(AppRoutes.auth.login.registrar);
    });
  };

  return (
    <RegistrarContext.Provider value={registrar}>
      <Stack height="100vh" direction="column">
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding={2}
          border="2px solid lightgrey"
          borderRadius={1}
        >
          {/* Logo */}
          <svg
            width="70px"
            height="70px"
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

          {/* Buttons */}
          <Stack direction="row" gap={2} alignItems="center">
            <Button
              variant="contained"
              sx={{ backgroundColor: "black", color: "white", '&:hover': { backgroundColor: "#333" } }}
              onClick={handleLogout}
            >
              Wyloguj
            </Button>
          </Stack>
        </Stack>

        <Box flexGrow={1} overflow="auto" position="relative" paddingBottom="50px">
          <Outlet />
        </Box>

        <Footer />
      </Stack>
    </RegistrarContext.Provider>
  );
}

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        padding: "10px",
        borderTop: "1px solid #ccc",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundColor: "#f9f9f9",
        fontSize: "14px",
      }}
    >
      <Stack direction="row" spacing={1}>
        <Link href="https://twitter.com" target="_blank" rel="noopener">
          <Twitter sx={{ fontSize: 20, color: "black" }} />
        </Link>
        <Link href="https://instagram.com" target="_blank" rel="noopener">
          <Instagram sx={{ fontSize: 20, color: "black" }} />
        </Link>
        <Link href="https://youtube.com" target="_blank" rel="noopener">
          <YouTube sx={{ fontSize: 20, color: "black" }} />
        </Link>
        <Link href="https://linkedin.com" target="_blank" rel="noopener">
          <LinkedIn sx={{ fontSize: 20, color: "black" }} />
        </Link>
      </Stack>

      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          Kontakt
        </Typography>
        <Typography sx={{ fontSize: "12px" }}>adres.biuro@example.com</Typography>
        <Typography sx={{ fontSize: "12px" }}>+48 111 222 333</Typography>
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          Adres
        </Typography>
        <Typography sx={{ fontSize: "12px" }}>ul. Floriańska 15</Typography>
        <Typography sx={{ fontSize: "12px" }}>31-019, Kraków</Typography>
      </Box>
    </Box>
  );
}
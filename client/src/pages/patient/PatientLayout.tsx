import { ApiRoutes, Patient } from "@medicup/shared";
import { Instagram, LinkedIn, Twitter, YouTube } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { Api } from "../../api";
import { AppRoutes } from "../../constants/AppRoutes";
import { PatientContext } from "../../context/PatientContext";

export default function PatientLayout() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const navigate = useNavigate();

  // funkcja do wylogowania
  const logout = useCallback(async () => {
    await Api.post(ApiRoutes.auth.logout, {}); // zakładając, że istnieje endpoint do wylogowania
    navigate(AppRoutes.auth.login.patient); // przekierowanie na stronę logowania
  }, [navigate]);

  // Fetch pacjenta
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

  useEffect(() => {
    fetchPatient();
  }, [fetchPatient]);

  return (
    <PatientContext.Provider value={{ patient, refresh: fetchPatient }}>
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

          <Stack direction="row" gap={2} alignItems="center">
            <Typography variant="h6">
              <Link
                to={AppRoutes.patient.home}
                style={{
                  textDecoration: "none",
                  color: "black",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement; // Type assertion
                  target.style.color = "blue";
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement; // Type assertion
                  target.style.color = "black";
                }}
              >
                Home
              </Link>
            </Typography>
            <Typography variant="h6">
              <Link
                to={AppRoutes.patient.profile}
                style={{
                  textDecoration: "none",
                  color: "black",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement; // Type assertion
                  target.style.color = "blue";
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement; // Type assertion
                  target.style.color = "black";
                }}
              >
                Profile
              </Link>
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={logout}
            >
              Wyloguj
            </Button>


          </Stack>
        </Stack>

        <Box
          flexGrow={1}
          overflow="auto"
          position="relative"
          paddingBottom="50px"
        >
          <Outlet />
        </Box>

        <Footer />
      </Stack>
    </PatientContext.Provider>
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
        <a href="https://twitter.com" target="_blank" rel="noopener">
          <Twitter sx={{ fontSize: 20, color: "black" }} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener">
          <Instagram sx={{ fontSize: 20, color: "black" }} />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener">
          <YouTube sx={{ fontSize: 20, color: "black" }} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener">
          <LinkedIn sx={{ fontSize: 20, color: "black" }} />
        </a>
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
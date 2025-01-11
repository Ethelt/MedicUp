import { ApiRoutes, Doctor } from "@medicup/shared";
import { Instagram, LinkedIn, Twitter, YouTube } from "@mui/icons-material";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { Api } from "../../api";
import { AppRoutes } from "../../constants/AppRoutes";
import { DoctorContext } from "../../context/DoctorContext";

export default function DoctorLayout() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      const response = await Api.get<undefined, Doctor>(ApiRoutes.doctor.me, undefined);
      if (response.ok) {
        setDoctor(response.data);
      } else {
        navigate(AppRoutes.auth.login.doctor);
      }
    };
    fetchDoctor();
  }, [navigate]);

  const handleLogout = () => {
    Api.post(ApiRoutes.auth.logout, undefined).finally(() => {
      navigate(AppRoutes.auth.login.doctor);
    });
  };

  return (
    <DoctorContext.Provider value={{ doctor }}>
      <Stack height="100%">
        {/* Header */}
        <header>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1rem",
              backgroundColor: "#ffffff",
              border: "2px solid lightgrey",
            }}
          >
            {/* Logo */}
            <Box sx={{ marginRight: "1rem", width: "50px", height: "auto" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 193 229"
                width="100%"
                height="100%"
              >
                <path
                  style={{ fill: "#3765ff", fillOpacity: 1 }}
                  d="M 0.3001292,75.380593 H 37.953427 L 57.972755,0.667449 109.93747,194.60242 138.49254,88.03344 h 55.06891 v 7.71067 H 145.53428 L 109.69998,229.47956 57.942579,36.318323 45.251496,83.68209 H 0.3001292 Z"
                />
              </svg>
            </Box>

            {/* Title */}
            <Typography variant="h4" component="div"></Typography>

            {/* Logout Button */}
            <Button
              variant="contained"
              sx={{ backgroundColor: "black", color: "white", '&:hover': { backgroundColor: "#333" } }}
              onClick={handleLogout}
            >
              Wyloguj
            </Button>
          </Box>
        </header>

        <Stack flex="1" overflow="auto">
          <Outlet />
        </Stack>

        <Footer />
      </Stack>
    </DoctorContext.Provider>
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

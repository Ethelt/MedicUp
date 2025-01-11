import { ApiRoutes, Doctor } from "@medicup/shared";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { Api } from "../../api";
import { AppRoutes } from "../../constants/AppRoutes";
import { DoctorContext } from "../../context/DoctorContext";

import logo from "../../assets/mlogo.svg";

export default function DoctorLayout() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      const response = await Api.get<undefined, Doctor>(
        ApiRoutes.doctor.me,
        undefined
      );
      if (response.ok) {
        setDoctor(response.data);
      } else {
        // @TODO: better error handling
        navigate(AppRoutes.auth.login.doctor);
      }
    };
    fetchPatient();
  }, [navigate]);

  return (
    <DoctorContext.Provider value={{ doctor }}>
      <Stack height="100%">
        {/* Add the new div with the logo and buttons here */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "50px", height: "50px", borderRadius: "5px" }}
          />
          <div>
            <button style={{
              backgroundColor: 'black',
              color: 'white',
              padding: '6px 40px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '10px',
              fontSize: '18px'
            }}>
              Wyloguj
            </button>
          </div>
        </div>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          p={2}
        >
        </Stack>
        <Outlet />
      </Stack>
    </DoctorContext.Provider>
  );
}
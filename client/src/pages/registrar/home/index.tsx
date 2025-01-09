import {
  ApiRoutes,
  GetAllPatientsRequestDto,
  GetAllPatientsResponseDto,
  Patient,
} from "@medicup/shared";
import { Grid2, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Api } from "../../../api";
import { AppRoutes } from "../../../constants/AppRoutes";
import { PatientCard } from "./PatientCard";

export default function RegistrarHome() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      const result = await Api.get<
        GetAllPatientsRequestDto,
        GetAllPatientsResponseDto
      >(ApiRoutes.patient.all, {});
      if (result.ok) {
        setPatients(result.data.patients);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) =>
    patient.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePatientCardClick = (patientId: number) => {
    navigate(
      AppRoutes.registrar.patientView.replace(
        ":patientId",
        patientId.toString()
      )
    );
  };

  return (
    <Stack spacing={3} height="100%" p={2}>
      <Typography variant="h4">Patient List</Typography>

      <TextField
        label="Nazwisko"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
      />

      <Grid2 container spacing={2}>
        {filteredPatients.map((patient) => (
          <Grid2 size={6} key={patient.id}>
            <PatientCard
              patient={patient}
              onClick={() => handlePatientCardClick(patient.id)}
            />
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
}

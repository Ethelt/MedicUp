import {
  ApiRoutes,
  GetPatientRequestDto,
  GetPatientResponseDto,
  GetVisitsForPatientRequestDto,
  GetVisitsForPatientResponseDto,
  Patient,
  Visit,
} from "@medicup/shared";
import { Box, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { Api } from "../../../api";
import { AppRoutes } from "../../../constants/AppRoutes";

import VisitCard from "./VisitCard";
export default function DoctorPatientDetails() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [visits, setVisits] = useState<Visit[]>([]);

  useEffect(() => {
    (async () => {
      if (!patientId) return;

      const response = await Api.get<
        GetPatientRequestDto,
        GetPatientResponseDto
      >(ApiRoutes.patient.root, { patientId: parseInt(patientId) });

      if (response.ok) {
        setPatient(response.data.patient);
      }
    })();
  }, [patientId]);

  const refreshVisits = useCallback(async () => {
    if (!patientId) return;

    const response = await Api.get<
      GetVisitsForPatientRequestDto,
      GetVisitsForPatientResponseDto
    >(ApiRoutes.patient.visits, { patientId: parseInt(patientId) });

    if (response.ok) {
      setVisits(response.data.visits);
    }
  }, [patientId]);

  useEffect(() => {
    refreshVisits();
  }, [refreshVisits]);

  if (!patientId) {
    return <Navigate to={AppRoutes.doctor.home} />;
  }

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <Stack px={2}>
      <Typography variant="h1">
        {patient.firstName} {patient.lastName}
      </Typography>
      {patient.note && (
        <Stack>
          <Typography>Notatka pacjenta:</Typography>
          <Typography>{patient.note}</Typography>
        </Stack>
      )}
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={2}
      >
        {visits.map((visit) => (
          <VisitCard visit={visit} key={visit.id} onUpdate={refreshVisits} />
        ))}
      </Box>
    </Stack>
  );
}

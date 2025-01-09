import {
  ApiRoutes,
  GetPatientRequestDto,
  GetPatientResponseDto,
  GetVisitsForPatientRequestDto,
  GetVisitsForPatientResponseDto,
  Patient,
  UpdatePatientRequestDto,
  UpdatePatientResponseDto,
  Visit,
} from "@medicup/shared";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { Api } from "../../../api";
import { AppRoutes } from "../../../constants/AppRoutes";
import VisitCard from "./VisitCard";

export default function DoctorPatientDetails() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [note, setNote] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    (async () => {
      if (!patientId) return;

      const response = await Api.get<
        GetPatientRequestDto,
        GetPatientResponseDto
      >(ApiRoutes.patient.root, { patientId: parseInt(patientId) });

      if (response.ok) {
        setPatient(response.data.patient);
        setNote(response.data.patient.note || "");
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

  const handleSaveNote = async () => {
    if (!patient || !patientId) return;

    const result = await Api.patch<
      UpdatePatientRequestDto,
      UpdatePatientResponseDto
    >(ApiRoutes.patient.root, {
      patientId: parseInt(patientId),
      note: note,
    });

    if (result.ok) {
      setPatient(result.data.patient);
      setIsEditing(false);
    } else {
      // @TODO: better error handling
      console.error("Failed to save note");
    }
  };

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
    <Stack px={2} spacing={2}>
      <Typography variant="h1">
        {patient.firstName} {patient.lastName}
      </Typography>
      <Stack spacing={1}>
        <Typography>Notatka o pacjencie:</Typography>
        {isEditing ? (
          <Stack spacing={1}>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <Stack spacing={1}>
              <Button variant="contained" onClick={handleSaveNote}>
                Zapisz
              </Button>
              <Button onClick={() => setIsEditing(false)}>Anuluj</Button>
            </Stack>
          </Stack>
        ) : (
          <Stack spacing={1} alignItems="flex-start">
            <Typography sx={{ flexGrow: 1 }}>
              {patient.note || "Brak notatki"}
            </Typography>
            <Button variant="contained" onClick={() => setIsEditing(true)}>
              Edytuj
            </Button>
          </Stack>
        )}
      </Stack>
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

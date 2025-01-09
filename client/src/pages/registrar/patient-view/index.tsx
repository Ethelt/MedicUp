import {
  ApiRoutes,
  GetPatientRequestDto,
  GetPatientResponseDto,
  Patient,
} from "@medicup/shared";
import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Api } from "../../../api";
import PatientCalendar from "../../patient/home/PatientCalendar";

export default function RegistrarPatientView() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!patientId) return;
      const result = await Api.get<GetPatientRequestDto, GetPatientResponseDto>(
        ApiRoutes.patient.root,
        {
          patientId: parseInt(patientId),
        }
      );
      if (result.ok) {
        setPatient(result.data.patient);
      }
    };
    fetchPatient();
  }, [patientId]);

  if (!patientId) return <Typography>Brak id pacjenta</Typography>;
  if (!patient) return null;

  return (
    <Stack height="100%">
      <PatientCalendar patient={patient} />
    </Stack>
  );
}

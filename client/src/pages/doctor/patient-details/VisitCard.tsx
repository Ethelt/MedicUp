import { Visit } from "@medicup/shared";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";

interface VisitCardProps {
  visit: Visit;
}

export default function VisitCard({ visit }: VisitCardProps) {
  return (
    <Box key={visit.id} border="1px solid" borderRadius={1} p={2}>
      <Typography variant="h6">
        {format(visit.startAt, "dd.MM.yyyy")} - dr. {visit.doctor.firstName}{" "}
        {visit.doctor.lastName}
      </Typography>
      {visit.patientNote && (
        <>
          <Typography>Notatka pacjenta:</Typography>
          <Typography>{visit.patientNote}</Typography>
        </>
      )}
      {visit.doctorPublicNote && (
        <>
          <Typography>Notatka publiczna dla pacjenta:</Typography>
          <Typography>{visit.doctorPublicNote}</Typography>
        </>
      )}
      {visit.doctorPrivateNote && (
        <>
          <Typography>Notatka prywatna dla lekarza:</Typography>
          <Typography>{visit.doctorPrivateNote}</Typography>
        </>
      )}
    </Box>
  );
}

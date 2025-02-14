import { Visit } from "@medicup/shared";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { AppRoutes } from "../../../constants/AppRoutes";
import { formatVisitDateRange } from "../../../utils/dates";

export type DoctorVisitDialogProps = {
  open: boolean;
  onClose: () => void;
  visit: Visit | null;
  onCancel: (visit: Visit) => Promise<void>;
};

export default function DoctorVisitDialog(props: DoctorVisitDialogProps) {
  const navigate = useNavigate();

  const handleOpenPatientDetails = async () => {
    if (!props.visit) return;

    navigate(
      AppRoutes.doctor.patientDetails.replace(
        ":patientId",
        props.visit.patient.id.toString()
      )
    );
  };

  if (!props.visit) return null;

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogContent>
          <Stack spacing={2}>
            <Typography variant="h6">Wizyta</Typography>
            <Typography>
              <b>Termin:</b>{" "}
              {formatVisitDateRange(props.visit.startAt, props.visit.endAt)}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography mr={2}>
                <b>Pacjent:</b>
              </Typography>
              <Typography>
                {props.visit.patient.firstName} {props.visit.patient.lastName}
              </Typography>
            </Stack>

            {props.visit.patientNote && (
              <Typography>
                <b>Notatka pacjenta:</b> {props.visit.patientNote}
              </Typography>
            )}
            {props.visit.doctorPublicNote && (
              <Typography>
                <b>Notatka lekarza:</b> {props.visit.doctorPublicNote}
              </Typography>
            )}
            {props.visit.doctorPrivateNote && (
              <Typography>
                <b>Notatka prywatna:</b> {props.visit.doctorPrivateNote}
              </Typography>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Stack spacing={2} width="100%">
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenPatientDetails}
            >
              Szczegóły pacjenta
            </Button>
            <Button variant="outlined" color="primary" onClick={props.onClose}>
              Zamknij
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
}

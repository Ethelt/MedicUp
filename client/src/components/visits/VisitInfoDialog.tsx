import { Visit } from "@medicup/shared";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { formatVisitDateRange } from "../../utils/dates";

export type VisitInfoDialogProps = {
  open: boolean;
  onClose: () => void;
  visit: Visit | null;
  onCancel: (visit: Visit) => Promise<void>;
};

export default function VisitInfoDialog(props: VisitInfoDialogProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancel = async () => {
    setShowConfirmation(true);
  };

  const handleConfirmedCancel = async () => {
    if (!props.visit) return;

    await props.onCancel(props.visit);
    setShowConfirmation(false);
    props.onClose();
  };

  if (!props.visit) return null;

  return (
    <>
      <Dialog open={props.open && !showConfirmation} onClose={props.onClose}>
        <DialogContent>
          <Stack spacing={2}>
            <Typography variant="h6">Wizyta</Typography>
            <Typography>
              <b>Termin:</b>{" "}
              {formatVisitDateRange(
                new Date(props.visit.startAt),
                new Date(props.visit.endAt)
              )}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography mr={2}>
                <b>Lekarz:</b>
              </Typography>
              <Typography>
                {props.visit.doctor.firstName} {props.visit.doctor.lastName}
              </Typography>
            </Stack>

            {props.visit.patientNote && (
              <Typography>
                <b>Notatka:</b> {props.visit.patientNote}
              </Typography>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Stack spacing={2} width="100%">
            <Button variant="contained" color="error" onClick={handleCancel}>
              Odwołaj wizytę
            </Button>
            <Button variant="outlined" color="primary" onClick={props.onClose}>
              Zamknij
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>

      {/* 
        @Task: popraw wygląd potwierdzenia anulowania wizyty
        wystarczy zmienić tylko ten DialogContent, ten powyzej robi coś innego
      */}
      <Dialog
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      >
        <DialogContent>
          <Stack spacing={2}>
            <Typography variant="h6">Potwierdź odwołanie wizyty</Typography>
            <Typography>Czy na pewno chcesz odwołać tę wizytę?</Typography>
            <Typography>
              <b>Termin:</b>{" "}
              {formatVisitDateRange(
                new Date(props.visit.startAt),
                new Date(props.visit.endAt)
              )}
            </Typography>
            <Typography>
              <b>Lekarz:</b> {props.visit.doctor.firstName}{" "}
              {props.visit.doctor.lastName}
            </Typography>
            {props.visit.patientNote && (
              <Typography>
                <b>Notatka:</b> {props.visit.patientNote}
              </Typography>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setShowConfirmation(false)}
          >
            Wróć
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmedCancel}
          >
            Odwołaj wizytę
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

import { Visit } from "@medicup/shared";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import { formatVisitDateRange } from "../../utils/dates";

export type VisitMoveDialogProps = {
  open: boolean;
  onMoveCancelled: () => void;
  visit: Visit | null;
  newStartAt: Date;
  newEndAt: Date;
  onMoveAccepted: (
    visitId: number,
    startAt: Date,
    endAt: Date
  ) => Promise<void>;
};

export default function VisitMoveDialog(props: VisitMoveDialogProps) {
  if (!props.visit) return null;

  return (
    <>
      {/* 
        @Task: popraw wygląd potwierdzenia przesunięcia wizyty
      */}
      <Dialog open={props.open} onClose={props.onMoveCancelled}>
        <DialogContent>
          <Stack spacing={2}>
            <Typography variant="h6">Potwierdź przesunięcie wizyty</Typography>
            <Typography>Czy na pewno chcesz przesunąć tę wizytę?</Typography>
            <Typography>
              <b>Stary termin:</b>{" "}
              {formatVisitDateRange(props.visit.startAt, props.visit.endAt)}
            </Typography>
            <Typography>
              <b>Nowy termin:</b>{" "}
              {formatVisitDateRange(props.newStartAt, props.newEndAt)}
            </Typography>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={props.onMoveCancelled}
          >
            Anuluj
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() =>
              props.onMoveAccepted(
                props.visit!.id,
                props.newStartAt,
                props.newEndAt
              )
            }
          >
            Przesuń wizytę
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

import {
  AddVisitRequestDto,
  ApiRoutes,
  Doctor,
  GetAvailableDoctorsRequestDto,
  GetAvailableDoctorsResponseDto,
} from "@medicup/shared";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Api } from "../../api";
import { formatVisitDateRange } from "../../utils/dates";

export type VisitAddDialogProps = {
  open: boolean;
  onClose: () => void;
  patientId: number;
  startAt: Date;
  endAt: Date;
  onSave: (dto: AddVisitRequestDto) => Promise<void>;
};

export default function VisitAddDialog(props: VisitAddDialogProps) {
  const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [patientNote, setPatientNote] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // to zignoruj
  useEffect(() => {
    (async () => {
      const result = await Api.get<
        GetAvailableDoctorsRequestDto,
        GetAvailableDoctorsResponseDto
      >(ApiRoutes.doctor.available, {
        start: props.startAt.toISOString(),
        end: props.endAt.toISOString(),
      });
      if (result.ok) {
        setAvailableDoctors(result.data.doctors);
      } else {
        // @TODO: handle errors
      }
    })();
  }, [props.startAt, props.endAt]);

  // to zignoruj
  const handleSave = async () => {
    if (selectedDoctor) {
      setShowConfirmation(true);
    }
  };

  // to zignoruj
  const handleConfirmedSave = async () => {
    if (selectedDoctor) {
      await props.onSave({
        patientId: props.patientId,
        doctorId: selectedDoctor.id,
        startAt: props.startAt,
        endAt: props.endAt,
        patientNote,
      });
      setShowConfirmation(false);
      props.onClose();
    }
  };

  return (
    <>
      {/* 
        @Task: popraw wygląd tworzenia wizyty
        wystarczy zmienić tylko ten Dialog, ten ponizej robi coś innego
      */}
      <Dialog open={props.open && !showConfirmation} onClose={props.onClose}>
        <DialogContent>
          <Stack spacing={2}>
            <Typography variant="h6">Nowa wizyta</Typography>
            <Typography>
              <b>Termin:</b> {formatVisitDateRange(props.startAt, props.endAt)}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography mr={2}>
                <b>Lekarz:</b>
              </Typography>
              <Select
                value={selectedDoctor?.id ?? ""}
                onChange={(e) =>
                  setSelectedDoctor(
                    availableDoctors.find(
                      (d) => d.id === parseInt(e.target.value.toString())
                    ) ?? null
                  )
                }
                fullWidth
              >
                {availableDoctors.map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.firstName} {d.lastName}
                  </MenuItem>
                ))}
              </Select>
            </Stack>

            {patientNote === null ? (
              <Button variant="outlined" onClick={() => setPatientNote("")}>
                Dodaj notatkę
              </Button>
            ) : (
              <TextField
                label="Notatka"
                multiline
                rows={3}
                value={patientNote}
                onChange={(e) => setPatientNote(e.target.value)}
                fullWidth
              />
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="primary" onClick={props.onClose}>
            Anuluj
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={!selectedDoctor}
          >
            Zapisz
          </Button>
        </DialogActions>
      </Dialog>

      {/* 
        @Task: popraw wygląd akceptacji wizyty
        wystarczy zmienić tylko ten DialogContent, ten powyzej robi coś innego
      */}
      <Dialog
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      >
        <DialogContent>
          <Stack spacing={2}>
            <Typography variant="h6">Potwierdź wizytę</Typography>
            <DialogContentText>
              Czy podane informacje są prawidłowe?
            </DialogContentText>
            <Typography>
              <b>Termin:</b> {formatVisitDateRange(props.startAt, props.endAt)}
            </Typography>
            <Typography>
              <b>Lekarz:</b> {selectedDoctor?.firstName}{" "}
              {selectedDoctor?.lastName}
            </Typography>
            {patientNote && (
              <Typography>
                <b>Notatka:</b> {patientNote}
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
            color="primary"
            onClick={handleConfirmedSave}
          >
            Potwierdź
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

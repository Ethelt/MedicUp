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
  MenuItem,
  Select,
  Stack,
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

// @TODO: add patient notes and improve the look
export default function VisitAddDialog(props: VisitAddDialogProps) {
  const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

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

  const handleSave = async () => {
    if (selectedDoctor) {
      await props.onSave({
        patientId: props.patientId,
        doctorId: selectedDoctor.id,
        startAt: props.startAt,
        endAt: props.endAt,
        patientNote: null,
      });
      props.onClose();
    }
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
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
  );
}

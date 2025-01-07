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

// @Task: dodanie pola z uwagami pacjenta
// na razie tylko wygląd, więc wystarczy zmienić tylko ten plik

export default function VisitAddDialog(props: VisitAddDialogProps) {
  const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [patientNote, setPatientNote] = useState<string | null>(null);

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
      await props.onSave({
        patientId: props.patientId,
        doctorId: selectedDoctor.id,
        startAt: props.startAt,
        endAt: props.endAt,
        patientNote,
      });
      props.onClose();
    }
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogContent>
        {/* 
        gdzieś w tym Stack trzeba to dodać
        niech przy zmianie uzywa setPatientNote
        przeczytaj dokumentację React jak działa useState
        mozna zrobić tak, ze jeśli jest null to nie pokazuje się input, tylko guzik "dodaj notatkę"
        a ten guzik robi setPatientNote("") i wtedy kiedy typeof patientNote === "string" to pokazuje się input
        ale jak masz prostszy sposób to zrób po swojemu, byle by na końcu wywoływąło to setPatientNote
        */}
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

import {
  AddVisitRequestDto,
  ApiRoutes,
  Doctor,
  GetAvailableDoctorsRequestDto,
  GetAvailableDoctorsResponseDto,
} from "@medicup/shared";
import { Dialog } from "@mui/material";

import { DialogContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Api } from "../../api";

export type VisitAddDialogProps = {
  open: boolean;
  onClose: () => void;
  patientId: number;
  startAt: Date;
  endAt: Date;
  onSave: (dto: AddVisitRequestDto) => void;
};

export default function VisitAddDialog(props: VisitAddDialogProps) {
  const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);

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

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogContent>
        <Typography>
          Range: {props.startAt.toISOString()} - {props.endAt.toISOString()}
        </Typography>
        <Typography>Patient id: {props.patientId}</Typography>
        <Typography>
          Doctors:{" "}
          {availableDoctors
            .map((d) => `${d.firstName} ${d.lastName}`)
            .join(", ")}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

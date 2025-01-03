import { AddVisitRequestDto } from "@medicup/shared";
import { Dialog } from "@mui/material";

import { DialogContent, Typography } from "@mui/material";

export type VisitAddDialogProps = {
  open: boolean;
  onClose: () => void;
  patientId: number;
  startAt: Date;
  endAt: Date;
  onSave: (dto: AddVisitRequestDto) => void;
};

export default function VisitAddDialog(props: VisitAddDialogProps) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogContent>
        <Typography>
          {props.startAt.toLocaleString()} - {props.endAt.toLocaleString()}
        </Typography>
        <Typography>{props.patientId}</Typography>
      </DialogContent>
    </Dialog>
  );
}

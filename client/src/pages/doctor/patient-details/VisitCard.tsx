import { ApiRoutes, Visit } from "@medicup/shared";
import {
  UpdateVisitRequestDto,
  UpdateVisitResponseDto,
} from "@medicup/shared/src/dto/requests/visit/update-visit";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import { Api } from "../../../api";

interface VisitCardProps {
  visit: Visit;
  onUpdate: () => void;
}

export default function VisitCard(props: VisitCardProps) {
  const [editingPrivateNote, setEditingPrivateNote] = useState(false);
  const [editingPublicNote, setEditingPublicNote] = useState(false);
  const [privateNote, setPrivateNote] = useState(
    props.visit.doctorPrivateNote || ""
  );
  const [publicNote, setPublicNote] = useState(
    props.visit.doctorPublicNote || ""
  );

  const handleUpdateNote = async (
    noteType: "private" | "public",
    note: string
  ) => {
    const updateData: UpdateVisitRequestDto = {
      visitId: props.visit.id,
      [noteType === "private" ? "doctorPrivateNote" : "doctorPublicNote"]: note,
    };

    const response = await Api.patch<
      UpdateVisitRequestDto,
      UpdateVisitResponseDto
    >(ApiRoutes.visit.root, updateData);

    if (response.ok) {
      props.onUpdate();
    } else {
      console.error("Error updating note:", response.error);
    }
  };

  return (
    <Stack spacing={1} border="1px solid" borderRadius={1} p={2}>
      <Typography variant="h6">
        {format(props.visit.startAt, "dd.MM.yyyy")} - dr.{" "}
        {props.visit.doctor.firstName} {props.visit.doctor.lastName}
      </Typography>
      {props.visit.patientNote && (
        <Box>
          <Typography>Notatka pacjenta:</Typography>
          <Typography>{props.visit.patientNote}</Typography>
        </Box>
      )}
      {props.visit.doctorPublicNote && (
        <Box>
          <Typography>Notatka publiczna dla pacjenta:</Typography>
          <Typography>{props.visit.doctorPublicNote}</Typography>
        </Box>
      )}
      {editingPublicNote ? (
        <>
          <TextField
            fullWidth
            value={publicNote}
            onChange={(e) => setPublicNote(e.target.value)}
            label="Edytuj notatkę publiczną"
          />
          <Button
            onClick={() => {
              handleUpdateNote("public", publicNote);
              setEditingPublicNote(false);
            }}
            variant="contained"
          >
            Zapisz
          </Button>
        </>
      ) : (
        <Button onClick={() => setEditingPublicNote(true)} variant="contained">
          Dodaj notatkę publiczną
        </Button>
      )}

      {props.visit.doctorPrivateNote && (
        <Box>
          <Typography>Notatka prywatna dla lekarza:</Typography>
          <Typography>{props.visit.doctorPrivateNote}</Typography>
        </Box>
      )}
      {editingPrivateNote ? (
        <>
          <TextField
            fullWidth
            value={privateNote}
            onChange={(e) => setPrivateNote(e.target.value)}
            label="Edytuj notatkę prywatną"
          />
          <Button
            onClick={() => {
              handleUpdateNote("private", privateNote);
              setEditingPrivateNote(false);
            }}
            variant="contained"
          >
            Zapisz
          </Button>
        </>
      ) : (
        <Button onClick={() => setEditingPrivateNote(true)} variant="contained">
          Dodaj notatkę prywatną
        </Button>
      )}
    </Stack>
  );
}

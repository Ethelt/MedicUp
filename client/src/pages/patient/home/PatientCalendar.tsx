import { CalendarApi } from "@fullcalendar/core/index.js";
import {
  AddVisitRequestDto,
  AddVisitResponseDto,
  ApiRoutes,
  CancelVisitRequestDto,
  CancelVisitResponseDto,
  GetVisitsForPatientRequestDto,
  GetVisitsForPatientResponseDto,
  Patient,
  UpdateVisitRequestDto,
  UpdateVisitResponseDto,
  Visit,
} from "@medicup/shared";
import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Api } from "../../../api";
import EditableVisitsCalendar from "../../../components/visits/EditableVisitsCalendar";
import VisitAddDialog, {
  VisitAddDialogProps,
} from "../../../components/visits/VisitAddDialog";
import VisitInfoDialog, {
  VisitInfoDialogProps,
} from "../../../components/visits/VisitInfoDialog";
import VisitMoveDialog, {
  VisitMoveDialogProps,
} from "../../../components/visits/VisitMoveDialog";

type PatientCalendarProps = {
  patient: Patient;
};

export default function PatientCalendar({ patient }: PatientCalendarProps) {
  const [visits, setVisits] = useState<Visit[]>([]);

  const refreshVisits = useCallback(async () => {
    if (!patient) return;

    const result = await Api.get<
      GetVisitsForPatientRequestDto,
      GetVisitsForPatientResponseDto
    >(ApiRoutes.patient.visits, {
      patientId: patient.id,
    });

    if (result.ok) {
      setVisits(result.data.visits);
    } else {
      // @TODO: handle errors
    }
  }, [patient]);

  useEffect(() => {
    refreshVisits();
  }, [refreshVisits]);

  const addVisit = useCallback(
    async (dto: AddVisitRequestDto) => {
      const result = await Api.post<AddVisitRequestDto, AddVisitResponseDto>(
        ApiRoutes.visit.root,
        dto
      );

      if (result.ok) {
        refreshVisits();
      } else {
        // @TODO: handle errors
      }
    },
    [refreshVisits]
  );

  const [visitAddPopupConfig, setVisitAddPopupConfig] = useState<
    Omit<VisitAddDialogProps, "onSave">
  >({
    open: false,
    onClose: () =>
      setVisitAddPopupConfig((config) => ({ ...config, open: false })),
    patientId: -1,
    startAt: new Date(),
    endAt: new Date(),
  });

  const cancelVisit = useCallback(
    async (visit: Visit) => {
      const result = await Api.delete<
        CancelVisitRequestDto,
        CancelVisitResponseDto
      >(ApiRoutes.visit.root, {
        visitId: visit.id,
      });

      if (result.ok) {
        refreshVisits();
      }
    },
    [refreshVisits]
  );

  const [visitInfoPopupConfig, setVisitInfoPopupConfig] = useState<
    Omit<VisitInfoDialogProps, "onCancel">
  >({
    open: false,
    onClose: () =>
      setVisitInfoPopupConfig((config) => ({ ...config, open: false })),
    visit: null,
  });

  const moveVisit = useCallback(
    async (visitId: number, start: Date, end: Date) => {
      const result = await Api.patch<
        UpdateVisitRequestDto,
        UpdateVisitResponseDto
      >(ApiRoutes.visit.root, {
        visitId: visitId,
        startAt: start,
        endAt: end,
      });

      if (result.ok) {
        refreshVisits();
        setVisitMovePopupConfig((config) => ({ ...config, open: false }));
      } else {
        // @TODO: handle errors
      }
    },
    [refreshVisits]
  );

  const revertVisitMove = useCallback(async () => {
    refreshVisits();
    setVisitMovePopupConfig((config) => ({ ...config, open: false }));
  }, [refreshVisits]);

  const [visitMovePopupConfig, setVisitMovePopupConfig] = useState<
    Omit<VisitMoveDialogProps, "onMoveAccepted" | "onMoveCancelled">
  >({
    open: false,
    visit: null,
    newStartAt: new Date(),
    newEndAt: new Date(),
  });

  const handleEventAdd = useCallback(
    (start: Date, end: Date, calendarApi: CalendarApi) => {
      console.warn(start, end, calendarApi);

      if (!patient) return;

      setVisitAddPopupConfig((config) => ({
        ...config,
        open: true,
        startAt: start,
        endAt: end,
        patientId: patient.id,
      }));
    },
    [patient]
  );

  const handleEventClick = useCallback((visit: Visit) => {
    setVisitInfoPopupConfig((config) => ({
      ...config,
      open: true,
      visit,
    }));
  }, []);

  const handleEventChange = useCallback(
    (visit: Visit, newStartAt: Date, newEndAt: Date) => {
      console.log(visit);
      setVisitMovePopupConfig((config) => ({
        ...config,
        open: true,
        visit: visit,
        newStartAt: newStartAt,
        newEndAt: newEndAt,
      }));
    },
    []
  );

  return (
    <Box sx={{ width: "100%" }} flex={1} minHeight={0}>
      <EditableVisitsCalendar
        handleEventAdd={handleEventAdd}
        handleEventClick={handleEventClick}
        handleEventChange={handleEventChange}
        visits={visits}
      />

      <VisitAddDialog {...visitAddPopupConfig} onSave={addVisit} />
      <VisitInfoDialog {...visitInfoPopupConfig} onCancel={cancelVisit} />
      <VisitMoveDialog
        {...visitMovePopupConfig}
        onMoveAccepted={moveVisit}
        onMoveCancelled={revertVisitMove}
      />
    </Box>
  );
}

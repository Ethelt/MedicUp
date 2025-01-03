import { CalendarApi } from "@fullcalendar/core/index.js";
import {
  AddVisitRequestDto,
  AddVisitResponseDto,
  ApiRoutes,
  GetVisitsRequestDto,
  GetVisitsResponseDto,
  Visit,
} from "@medicup/shared";
import { Box, Stack, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { Api } from "../../../api";
import VisitAddDialog, {
  VisitAddDialogProps,
} from "../../../components/visits/VisitAddDialog";
import VisitsCalendar from "../../../components/visits/VisitsCalendar";
import { PatientContext } from "../../../context/PatientContext";

export default function PatientHome() {
  const { patient } = useContext(PatientContext);
  const [visits, setVisits] = useState<Visit[]>([]);

  const refreshVisits = useCallback(async () => {
    if (!patient) return;

    const result = await Api.get<GetVisitsRequestDto, GetVisitsResponseDto>(
      ApiRoutes.patient.visits,
      {
        patientId: patient.id,
      }
    );

    if (result.ok) {
      setVisits(result.data.visits);
    } else {
      // @TODO: handle errors
    }
  }, [patient]);

  useEffect(() => {
    refreshVisits();
  }, [refreshVisits]);

  const handleVisitAdd = useCallback(
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

  // @TODO: implement visit moving
  const handleEventChange = useCallback(
    (start: Date, end: Date, calendarApi: CalendarApi) => {
      console.log(start, end, calendarApi);
    },
    []
  );

  return (
    <Stack height="100%">
      <Typography variant="h2">PatientHome</Typography>
      <Box sx={{ width: "100%" }} flex={1} minHeight={0}>
        <VisitsCalendar
          handleEventAdd={handleEventAdd}
          handleEventChange={handleEventChange}
          visits={visits}
        />

        <VisitAddDialog {...visitAddPopupConfig} onSave={handleVisitAdd} />
      </Box>
    </Stack>
  );
}

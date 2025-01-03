import { CalendarApi } from "@fullcalendar/core/index.js";
import { AddVisitRequestDto } from "@medicup/shared";
import { Box, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import VisitAddDialog, {
  VisitAddDialogProps,
} from "../../../components/visits/VisitAddDialog";
import VisitsCalendar from "../../../components/visits/VisitsCalendar";

export default function PatientHome() {
  const handleVisitAdd = useCallback((dto: AddVisitRequestDto) => {
    console.log(dto);
  }, []);

  const [visitAddPopupConfig, setVisitAddPopupConfig] =
    useState<VisitAddDialogProps>({
      open: false,
      onClose: () =>
        setVisitAddPopupConfig((config) => ({ ...config, open: false })),
      patientId: 1,
      startAt: new Date(),
      endAt: new Date(),
      onSave: handleVisitAdd,
    });

  const handleEventAdd = (start: Date, end: Date, calendarApi: CalendarApi) => {
    console.log(start, end, calendarApi);

    setVisitAddPopupConfig((config) => ({
      ...config,
      open: true,
      startAt: start,
      endAt: end,
      patientId: 10,
    }));

    // const title = prompt("Enter event title:");
    // if (title) {
    //   calendarApi.addEvent({
    //     title,
    //     start: start,
    //     end: end,
    //   });
    // }
  };

  const handleEventChange = (
    start: Date,
    end: Date,
    calendarApi: CalendarApi
  ) => {
    console.log(start, end, calendarApi);

    // const title = prompt("Enter event title:");
    // if (title) {
    //   calendarApi.addEvent({
    //     title,
    //     start: start,
    //     end: end,
    //   });
    // }
  };

  return (
    <Stack height="100%">
      <Typography variant="h2">PatientHome</Typography>
      <Box sx={{ width: "100%" }} flex={1} minHeight={0}>
        <VisitsCalendar
          handleEventAdd={handleEventAdd}
          handleEventChange={handleEventChange}
        />

        <VisitAddDialog {...visitAddPopupConfig} />
      </Box>
    </Stack>
  );
}

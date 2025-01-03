import { CalendarApi } from "@fullcalendar/core/index.js";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Box, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { PatientContext } from "../../../context/PatientContext";

export default function PatientHome() {
  const patient = useContext(PatientContext);

  const handleEventAdd = (start: Date, end: Date, calendarApi: CalendarApi) => {
    console.log(start, end, calendarApi);

    const title = prompt("Enter event title:");
    if (title) {
      calendarApi.addEvent({
        title,
        start: start,
        end: end,
      });
    }
  };

  const handleEventChange = (
    start: Date,
    end: Date,
    calendarApi: CalendarApi,
    revert: () => void
  ) => {
    console.log(start, end, calendarApi, revert);

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
        <FullCalendar
          height={"100%"}
          plugins={[timeGridPlugin, interactionPlugin]}
          duration={{ week: 1 }}
          allDaySlot={false}
          slotMinTime={"06:00:00"}
          slotMaxTime={"20:00:00"}
          firstDay={1}
          initialView="timeGrid"
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          editable={true}
          selectable={true}
          select={(e) => handleEventAdd(e.start, e.end, e.view.calendar)}
          eventChange={(e) =>
            handleEventChange(
              e.event.start!,
              e.event.end!,
              e.event._context.calendarApi,
              e.revert
            )
          }
          eventResizableFromStart={true}
          eventOverlap={false}
          selectOverlap={false}
        />
      </Box>
    </Stack>
  );
}

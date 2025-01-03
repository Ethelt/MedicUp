import { CalendarApi } from "@fullcalendar/core/index.js";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

type VisitsCalendarProps = {
  handleEventAdd: (start: Date, end: Date, calendarApi: CalendarApi) => void;
  handleEventChange: (start: Date, end: Date, calendarApi: CalendarApi) => void;
};

export default function VisitsCalendar(props: VisitsCalendarProps) {
  return (
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
      select={(e) => props.handleEventAdd(e.start, e.end, e.view.calendar)}
      eventChange={(e) =>
        props.handleEventChange(
          e.event.start!,
          e.event.end!,
          e.event._context.calendarApi
        )
      }
      eventResizableFromStart={true}
      eventOverlap={false}
      selectOverlap={false}
    />
  );
}

import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Visit } from "@medicup/shared";
import { useMemo } from "react";

type StaticVisitsCalendarProps = {
  handleEventClick: (visit: Visit) => void;
  visits: Visit[];
};

export default function StaticVisitsCalendar(props: StaticVisitsCalendarProps) {
  const events = useMemo(
    () =>
      props.visits.map((visit) => ({
        id: visit.id.toString(),
        start: visit.startAt,
        end: visit.endAt,
        title: `Wizyta ${visit.patient.firstName} ${visit.patient.lastName} - dr ${visit.doctor.firstName} ${visit.doctor.lastName}`,
        backgroundColor: visit.cancelledAt ? cancelledVisitColor : undefined,
      })),
    [props.visits]
  );

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
      dayHeaderFormat={{
        weekday: "short",
        day: "numeric",
        month: "short",
        omitCommas: true,
      }}
      selectConstraint={{ startTime: "06:00:00", endTime: "20:00:00" }}
      locale="pl"
      editable={true}
      selectable={true}
      eventClick={(e) => {
        const visit = props.visits.find(
          (visit) => visit.id.toString() === e.event.id
        );
        if (visit) {
          props.handleEventClick(visit);
        }
      }}
      events={events}
    />
  );
}

const cancelledVisitColor = "grey";

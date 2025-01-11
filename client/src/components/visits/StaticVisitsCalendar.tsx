import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Visit } from "@medicup/shared";
import { useMemo } from "react";

import logo from "../../assets/mlogo.svg";

type StaticVisitsCalendarProps = {
  handleEventClick: (visit: Visit) => void;
  visits: Visit[];
};

const cancelledVisitColor = "grey";

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
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0" }}>
        <img
          src={logo}
          alt="Logo"
          style={{ width: "50px", height: "50px", borderRadius: "5px" }}
        />
        <div>
          <button>Button 1</button>
          <button>Button 2</button>
          <button>Button 3</button>
        </div>
      </div>

      <div style={{ marginTop: 0, paddingTop: 0, height: 'calc(100% - 50px)' }}>
        <FullCalendar
          height="100%"
          plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
          initialView="timeGridWeek"
          views={{
            timeGridDay: {
              type: "timeGrid",
              duration: { days: 1 },
              buttonText: "Dzień",
            },
            timeGridWeek: {
              type: "timeGrid",
              duration: { weeks: 1 },
              buttonText: "Tydzień",
            },
            dayGridMonth: {
              type: "dayGrid",
              duration: { months: 1 },
              buttonText: "Miesiąc",
            },
          }}
          headerToolbar={{
            start: "prev,next today",
            center: "title",
            end: "timeGridDay,timeGridWeek,dayGridMonth",
          }}
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
          locale="pl"
          editable={false}
          selectable={false}
          events={events}
          eventClick={(e) => {
            const visit = props.visits.find(
              (visit) => visit.id.toString() === e.event.id
            );
            if (visit && !visit.cancelledAt) {
              props.handleEventClick(visit);
            }
          }}
        />
      </div>
    </div>
  );
}
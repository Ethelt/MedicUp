import { CalendarApi, OverlapFunc } from "@fullcalendar/core/index.js";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  ApiRoutes,
  Doctor,
  GetVisitsForDoctorRequestDto,
  GetVisitsForDoctorResponseDto,
  Visit,
} from "@medicup/shared";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Api } from "../../api";

type EditableVisitsCalendarProps = {
  handleEventAdd: (start: Date, end: Date, calendarApi: CalendarApi) => void;
  handleEventClick: (visit: Visit) => void;
  handleEventChange: (visit: Visit, newStartAt: Date, newEndAt: Date) => void;
  visits: Visit[];
};

export default function EditableVisitsCalendar(
  props: EditableVisitsCalendarProps
) {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    (async () => {
      const response = await Api.get<undefined, { doctors: Doctor[] }>(
        ApiRoutes.doctor.root,
        undefined
      );
      if (response.ok) {
        setDoctors(response.data.doctors);
      }
    })();
  }, []);

  const events = useMemo(
    () =>
      props.visits.map((visit) => ({
        id: visit.id.toString(),
        start: visit.startAt,
        end: visit.endAt,
        title: `Wizyta ${visit.patient.firstName} ${visit.patient.lastName} - dr ${visit.doctor.firstName} ${visit.doctor.lastName}`,
        backgroundColor: visit.cancelledAt ? cancelledVisitColor : undefined,
        editable: visit.cancelledAt ? false : true,
      })),
    [props.visits]
  );

  // used when moving the visits
  const [doctorVisits, setDoctorVisits] = useState<Visit[]>([]);

  const loadDoctorVisits = useCallback(async (doctorId: number) => {
    const response = await Api.get<
      GetVisitsForDoctorRequestDto,
      GetVisitsForDoctorResponseDto
    >(ApiRoutes.doctor.visits, {
      doctorId,
    });
    if (response.ok) {
      setDoctorVisits(response.data.visits);
    }
  }, []);

  const backgroundEvents = useMemo(() => {
    return doctorVisits
      .filter((visit) => !visit.cancelledAt)
      .filter((visit) => !props.visits.find((v) => v.id === visit.id))
      .map((visit) => ({
        id: `background-${visit.id.toString()}`,
        start: visit.startAt,
        end: visit.endAt,
        display: "background",
        title: "",
        backgroundColor: "red",
        editable: false,
        selectable: false,
      }));
  }, [doctorVisits, props.visits]);

  const allEvents = useMemo(() => {
    return [...backgroundEvents, ...events];
  }, [backgroundEvents, events]);

  const selectDoctor = useCallback(
    async (doctorId: number) => {
      setSelectedDoctor(doctors.find((d) => d.id === doctorId)!);
      await loadDoctorVisits(doctorId);
    },
    [doctors, loadDoctorVisits]
  );

  return (
    <Stack height="100%" width="100%">
      <FormControl sx={{ my: 2, mx: 2 }}>
        <InputLabel
          sx={{ backgroundColor: "white", pr: 1 }}
          id="doctor-select-label"
        >
          Sprawdź dostępność lekarza
        </InputLabel>
        <Select
          labelId="doctor-select-label"
          value={selectedDoctor?.id || ""}
          onChange={async (e) => {
            const doctorId = e.target.value as number;
            if (doctorId) {
              await selectDoctor(doctorId);
            }
          }}
          label="Lekarz"
        >
          {doctors.map((doctor) => (
            <MenuItem key={doctor.id} value={doctor.id}>
              {doctor.firstName} {doctor.lastName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FullCalendar
        // height={"300%"}
        contentHeight={2000}
        expandRows={true}
        plugins={[timeGridPlugin, interactionPlugin]}
        duration={{ week: 1 }}
        allDaySlot={false}
        slotMinTime={"06:00:00"}
        slotMaxTime={"20:00:00"}
        firstDay={1}
        slotDuration={"00:30:00"}
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
        buttonText={{
          today: "Dzisiaj",
        }}
        selectConstraint={{ startTime: "06:00:00", endTime: "20:00:00" }}
        locale="pl"
        editable={true}
        selectable={true}
        select={(e) => props.handleEventAdd(e.start, e.end, e.view.calendar)}
        eventChange={(e) => {
          const visit = props.visits.find(
            (visit) => visit.id.toString() === e.event.id
          );
          if (visit) {
            props.handleEventChange(visit, e.event.start!, e.event.end!);
          }
        }}
        eventClick={(e) => {
          const visit = props.visits.find(
            (visit) => visit.id.toString() === e.event.id
          );
          if (visit && !visit.cancelledAt) {
            props.handleEventClick(visit);
          }
        }}
        eventDragStart={(e) => {
          const visit = props.visits.find(
            (visit) => visit.id.toString() === e.event.id
          );
          if (visit) {
            selectDoctor(visit.doctor.id);
          }
        }}
        eventDragStop={() => {
          setSelectedDoctor(null);
          setDoctorVisits([]);
        }}
        eventResizableFromStart={true}
        eventOverlap={disallowNonCancelledOverlap}
        selectOverlap={disallowNonCancelledOverlap}
        events={allEvents}
        eventAllow={(e) => e.start >= new Date()}
        selectAllow={(e) => e.start >= new Date()}
      />
    </Stack>
  );
}

const cancelledVisitColor = "grey";

const disallowNonCancelledOverlap: OverlapFunc = (stillEvent) => {
  // stupid but works
  if (stillEvent.backgroundColor === cancelledVisitColor) return true;
  return false;
};

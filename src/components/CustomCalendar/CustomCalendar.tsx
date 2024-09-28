import React, { useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Views,
  stringOrDate,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import { CustomToolbar } from "./CustomToolbar/CustomToolbar";
import CalendarHeader from "./CustomHeader/CalendarHeader";
import { initialEvents } from "../../constants/events";
import ModalForm from "../ModalForm/ModalForm";
import { CustomTimeGutterHeader } from "./CustomTimeGutterHeader/CustomTimeGutterHeader";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

export interface EventDetails {
  id?: string | number;
  title: string;
  start?: Date | undefined;
  end?: Date;
  notes: string;
  color?: string;
}

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DnDCalendar = withDragAndDrop<withDragAndDropProps & EventDetails>(
  Calendar
);

const CustomCalendar: React.FC = () => {
  const [events, setEvents] = useState<EventDetails[]>(initialEvents);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentEventId, setCurrentEventId] = useState<
    string | undefined | number
  >();

  const [newEvent, setNewEvent] = useState<EventDetails>({
    title: "",
    notes: "",
    start: undefined,
    end: undefined,
    color: "",
  });

  const handleSelectSlot = (slotInfo: any) => {
    setNewEvent({
      title: "",
      start: slotInfo.start,
      end: slotInfo.end,
      notes: "",
      color: "#3B86FF",
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleSelectEvent = (event: EventDetails) => {
    setNewEvent(event);
    setCurrentEventId(event.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSaveEvent = () => {
    if (!newEvent.title) {
      alert("please enter a title");
      return;
    }

    if (newEvent.title.length > 30) {
      alert("Title can't exceed 30 characters");
      return;
    }

    if (isEditing) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === currentEventId
            ? { ...newEvent, id: currentEventId }
            : event
        )
      );
    } else {
      const newId = Math.random().toString(36).substring(7);
      setEvents((prevEvents) => [...prevEvents, { ...newEvent, id: newId }]);
    }

    setShowModal(false);
  };

  const handleDeleteEvent = () => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== currentEventId)
    );
    setShowModal(false);
  };

  const handleEventDrop = ({
    event,
    start,
    end,
  }: {
    event: EventDetails;
    start: stringOrDate; // Изменяем тип на stringOrDate
    end: stringOrDate; // Изменяем тип на stringOrDate
  }) => {
    const updatedEvents = events.map((existingEvent) =>
      existingEvent.id === event.id
        ? { ...existingEvent, start: new Date(start), end: new Date(end) } // Преобразуем в Date
        : existingEvent
    );
    setEvents(updatedEvents);
  };

  const handleEventResize = ({
    event,
    start,
    end,
  }: {
    event: EventDetails;
    start: stringOrDate;
    end: stringOrDate;
  }) => {
    const updatedEvents = events.map((existingEvent) =>
      existingEvent.id === event.id
        ? { ...existingEvent, start: new Date(start), end: new Date(end) }
        : existingEvent
    );
    setEvents(updatedEvents);
  };

  return (
    <div className="calendar-container">
      <ModalForm
        showModal={showModal}
        setShowModal={setShowModal}
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        handleAddEvent={handleSaveEvent}
        isEditing={isEditing}
        handleDeleteEvent={handleDeleteEvent}
      />

      <DnDCalendar
        localizer={localizer}
        events={events}
        timeslots={2}
        step={60}
        showMultiDayTimes={true}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        defaultView={Views.MONTH}
        views={["month", "week", "day", "agenda"]}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        style={{ minHeight: 859, margin: "25px 25px 0 25px", height: 859 }}
        components={{
          toolbar: CustomToolbar,
          month: {
            header: CalendarHeader,
          },
          timeGutterHeader: CustomTimeGutterHeader,
        }}
        eventPropGetter={(event: EventDetails) => {
          return {
            style: {
              backgroundColor: event.color || "#3B86FF",
              borderRadius: "5px",
              height: "30px",
              color: "#fff",
              border: "none",
              display: "flex",
              alignItems: "center",
            },
          };
        }}
      />
    </div>
  );
};

export default CustomCalendar;

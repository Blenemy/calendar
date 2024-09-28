import moment from "moment";

export const initialEvents = [
  {
    id: 1,
    start: moment("2024-09-28T14:00:00").toDate(),
    end: moment("2024-09-28T16:00:00").toDate(),
    title: "Event name 1",
    notes: "",
    color: "#ff0000",
  },
  {
    id: 2,
    start: moment("2024-09-28T12:00:00").toDate(),
    end: moment("2024-09-28T16:00:00").toDate(),
    title: "Event name 2",
    notes: "",
    color: "#8a2be2",
  },
  {
    id: 3,
    start: moment("2024-09-28T20:00:00").toDate(),
    end: moment("2024-09-28T23:00:00").toDate(),
    title: "Event name 3",
    notes: "",
  },
  {
    id: 4,
    start: moment("2024-09-28T00:00:00").toDate(),
    end: moment("2024-09-28T23:59:59").toDate(),
    title: "All Day Event",
    notes: "",
    allDay: true,
    color: "#ffa500",
  },
];

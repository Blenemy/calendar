import React from "react";
import { ToolbarProps, View } from "react-big-calendar";
import ToolbarButton from "./ToolbarButton/ToolbarButton";
import { EventDetails } from "../CustomCalendar";

export const CustomToolbar: React.FC<ToolbarProps<EventDetails, object>> = ({
  label,
  onNavigate,
  onView,
  view,
  date,
}) => {
  const handleNavigate = (action: "TODAY" | "PREV" | "NEXT") => {
    onNavigate(action);
  };

  const handleViewChange = (newView: View) => {
    onView(newView);
  };

  const isTodayActive = () => {
    const today = new Date();
    return (
      view === "month" &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    );
  };

  return (
    <div
      className="custom-toolbar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <h2 style={{ fontSize: "18px", color: "#4D4F5C" }}>Calendar View</h2>
        <div className="toolbar-button-group">
          <ToolbarButton
            onClick={() => handleNavigate("TODAY")}
            label="Today"
            active={isTodayActive()}
          />
          <ToolbarButton onClick={() => handleNavigate("PREV")} label="Prev" />
          <ToolbarButton onClick={() => handleNavigate("NEXT")} label="Next" />
        </div>
      </div>

      <span
        className="toolbar-label"
        style={{
          fontSize: "18px",
          color: "#4D4F5C",
          alignSelf: "flex-end",
        }}
      >
        {label}
      </span>

      <div className="toolbar-button-group">
        <ToolbarButton
          onClick={() => handleViewChange("month")}
          label="Month"
          active={view === "month"}
        />
        <ToolbarButton
          onClick={() => handleViewChange("week")}
          label="Week"
          active={view === "week"}
        />

        <ToolbarButton
          onClick={() => handleViewChange("day")}
          label="Day"
          active={view === "day"}
        />

        <ToolbarButton
          onClick={() => handleViewChange("agenda")}
          label="Agenda"
          active={view === "agenda"}
        />
      </div>
    </div>
  );
};

const CalendarHeader = ({ label }: { label: React.ReactNode }) => {
  return (
    <div
      style={{
        color: "#A3A6B4",
        textAlign: "center",
        height: "45px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5F6FA",
      }}
    >
      {label}
    </div>
  );
};

export default CalendarHeader;

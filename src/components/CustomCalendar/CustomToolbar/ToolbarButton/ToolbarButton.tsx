import "./ToolbarButton.css";

interface ToolbarButtonprops {
  label: string;
  onClick: () => void;
  active?: boolean;
}

const ToolbarButton: React.FC<ToolbarButtonprops> = ({
  label,
  onClick,
  active,
}) => {
  return (
    <button
      className={`toolbar-button ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ToolbarButton;

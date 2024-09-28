import React, { useState, ChangeEvent } from "react";
import Modal from "react-modal";
import moment from "moment";

import { EventDetails } from "../CustomCalendar/CustomCalendar";

import close from "../../assets/circle-close.svg";

import "./ModalForm.css";

interface ModalFormProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  newEvent: EventDetails;
  setNewEvent: (event: EventDetails) => void;
  handleAddEvent?: () => void;
  handleDeleteEvent: () => void;
  isEditing: boolean;
}

Modal.setAppElement("#root");

const modalStyles = {
  overlay: {
    zIndex: 999,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    zIndex: 1000,
    backgroundColor: "#fff",
  },
};

const ModalForm: React.FC<ModalFormProps> = ({
  showModal,
  setShowModal,
  newEvent,
  setNewEvent,
  handleAddEvent,
  isEditing,
  handleDeleteEvent,
}) => {
  const [errors, setErrors] = useState({
    title: "",
    start: "",
    end: "",
    notes: "",
  });

  const validateFields = (): boolean => {
    const newErrors = { title: "", start: "", end: "", notes: "" };
    let isValid = true;

    if (!newEvent.title) {
      newErrors.title = "Title is required.";
      isValid = false;
    }

    if (!newEvent.start) {
      newErrors.start = "Start date is required.";
      isValid = false;
    } else if (moment(newEvent.start).isBefore(moment())) {
      newErrors.start = "Past dates are not allowed.";
      isValid = false;
    }

    if (!newEvent.end) {
      newErrors.end = "End date is required.";
      isValid = false;
    } else if (
      newEvent.start &&
      newEvent.end &&
      newEvent.end < newEvent.start
    ) {
      newErrors.end = "End date cannot be before start date.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  const handleDateChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: "start" | "end"
  ) => {
    setNewEvent({
      ...newEvent,
      [field]: new Date(e.target.value),
    });
  };

  const handleSave = () => {
    if (validateFields() && handleAddEvent) {
      handleAddEvent();
    }
  };

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      style={modalStyles}
      contentLabel="Add New Event"
    >
      <div className="event-form">
        <div className="event-form__cross" onClick={() => setShowModal(false)}>
          <img src={close} alt="close" className="event-form__cross-img" />
        </div>
        <div className="event-form__content">
          <div className="event-form__form-fields">
            <div className="event-form__container">
              <label htmlFor="event-form-title" className="event-form__label">
                Event Name
              </label>
              <input
                type="text"
                name="title"
                id="event-title"
                value={newEvent.title}
                onChange={handleInputChange}
                maxLength={30}
                className="event-form__input"
              />
              {errors.title && (
                <span className="error-message">{errors.title}</span>
              )}
            </div>

            <div className="event-form__container">
              <label
                className="event-form__label"
                htmlFor="event-form-start-date"
              >
                Event Start Date
              </label>
              <input
                type="datetime-local"
                name="start"
                value={
                  newEvent.start
                    ? moment(newEvent.start).format("YYYY-MM-DDTHH:mm")
                    : ""
                }
                id="event-form-start-date"
                onChange={(e) => handleDateChange(e, "start")}
                className="event-form__input"
              />
              {errors.start && (
                <span className="error-message">{errors.start}</span>
              )}
            </div>

            <div className="event-form__container">
              <label
                className="event-form__label"
                htmlFor="event-form-end-date"
              >
                Event End Date
              </label>
              <input
                type="datetime-local"
                name="end"
                id="event-form-end-date"
                value={
                  newEvent.end
                    ? moment(newEvent.end).format("YYYY-MM-DDTHH:mm")
                    : ""
                }
                onChange={(e) => handleDateChange(e, "end")}
                className="event-form__input"
              />
              {errors.end && (
                <span className="error-message">{errors.end}</span>
              )}
            </div>

            <div className="event-form__container">
              <label className="event-form__label" htmlFor="event-form-notes">
                Notes
              </label>
              <input
                type="text"
                name="notes"
                id="event-form-notes"
                value={newEvent.notes}
                onChange={handleInputChange}
                className="event-form__input"
              />
              {errors.notes && (
                <span className="error-message">{errors.notes}</span>
              )}
            </div>

            <div className="event-form__container">
              <label className="event-form__label" htmlFor="event-form-color">
                Select Color
              </label>
              <input
                type="color"
                name="color"
                id="event-form-color"
                value={newEvent.color || "#3B86FF"}
                onChange={handleInputChange}
                className="event-form__input"
              />
            </div>
          </div>

          {isEditing && handleDeleteEvent && (
            <button
              className="event-form__button delete-button"
              onClick={handleDeleteEvent}
            >
              Delete event
            </button>
          )}

          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="event-form__buttons-wrapper"
          >
            <button
              className="event-form__button cancel-button"
              onClick={() => setShowModal(false)}
              style={{ color: "red" }}
            >
              {isEditing ? "Discard" : "Cancel"}
            </button>
            <button
              className="event-form__button save-button"
              onClick={handleSave}
              style={{ color: "blue" }}
            >
              {isEditing ? "Edit" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalForm;

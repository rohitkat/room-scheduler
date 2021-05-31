import React, { useEffect, useState } from "react";
import Modal from "./Modal/Modal";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "../events";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Experimental = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedBookingData, setSelectedBookingData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      const findRoom = rooms.find((x) => x.id == selectedRoom.id);
      if (findRoom) setSelectedRoom({ ...findRoom });
    }
  }, [rooms]);

  useEffect(() => {
    if (selectedBookingData) setShowModal(true);
  }, [selectedBookingData]);

  const getRooms = () => {
    fetch("http://localhost:4600/api/rooms")
      .then((response) => response.json())
      .then((data) => {
        setRooms(data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSelect = ({ start }) => {
    const checkExisting = events.find((x) =>
      moment(x.start).isSame(moment(start))
    );
    if (checkExisting) {
      handleSelectEvent(checkExisting);
    }
  };

  const handleSelectEvent = (bookingData) => {
    setSelectedBookingData(bookingData);
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  const eventStyleGetter = (event) => {
    console.log(event);
    var backgroundColor = `#${event.available ? "01916b" : "91012c"}`;
    console.log(backgroundColor);
    return {
      style: {
        backgroundColor: backgroundColor,
      },
    };
  };

  return (
    <>
      <div className="row">
        <div
          class="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">...</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {showModal && (
          <Modal
            onClose={() => setShowModal(false)}
            bookingData={selectedBookingData}
            getRooms={getRooms}
          />
        )}
        <div className="col-md-3 mb-4">
          <div>
            {rooms.length && (
              <div className="list-group">
                {rooms.map((room) => (
                  <a
                    key={room.id}
                    onClick={() => handleRoomSelect(room)}
                    className={`list-group-item ${
                      selectedRoom?.id == room.id && "active"
                    }`}
                  >
                    <span>{room.roomNumber}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="col-md-9">
          <div>
            {selectedRoom && (
              <Calendar
                selectable
                localizer={localizer}
                events={selectedRoom.bookings.map((booking) => {
                  return {
                    ...booking,
                    title: `$${booking.price} ${
                      booking.available ? "A" : "NA"
                    }`,
                    start: booking.startDate,
                    end: booking.endDate,
                  };
                })}
                defaultView={Views.MONTH}
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date()}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelect}
                style={{ height: 700, width: "100%" }}
                eventPropGetter={eventStyleGetter}
                views={["month"]}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Experimental;

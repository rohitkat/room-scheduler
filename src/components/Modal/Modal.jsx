import React, { useState } from "react";
import "./modal.css";

const Modal = (props) => {
  const [price, setPrice] = useState(props.bookingData.price || "");
  const [available, setAvailable] = useState(
    props.bookingData.available || false
  );

  console.log(props);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    //fetch request to update
    fetch(`http://localhost:4600/api/bookings/${props.bookingData.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ price, available }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        props.onClose();
        props.getRooms();
      });
  };

  return (
    <div
      className={`modal fade show`}
      style={{
        display: `${"block"}`,
      }}
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          {/* <div className="modal-header">
            <div className="camera-box">
              <img alt="" src="/img/yellow-logo.svg" />
              <h5 className="modal-title" id="exampleModalLabel">
                Welcome to the Cozy App!
              </h5>
            </div>
          </div> */}
          <div className="modal-body">
            <form onSubmit={handleFormSubmit}>
              <label>Price:</label>
            
              <input
                type="text"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-control mb-2"
              />{" "}
              <label>
                <input
                  type="checkbox"
                  id="available"
                  name="available"
                  value={available}
                  checked={available}
                  onChange={(e) => setAvailable(e.target.checked)}
                />{" "}
                Is available?
              </label>{" "}
             
            </form>
            <button
              className="btn btn-primary mt-3"
              style={{ marginRight: "5px" }}
              onClick={handleFormSubmit}
            >
              submit
            </button>
            <button className="btn btn-danger mt-3" onClick={props.onClose}>
              close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

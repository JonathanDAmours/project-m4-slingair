"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

//  Use this data. Changes will persist until the server (backend) restarts.
const { flights, reservations } = require("./data");

const getFlights = (req, res) => {
  res.status(200).json({ status: 200, data: flights });
};

const getFlight = (req, res) => {
  const id = req.params.id; // the id represent the id in the URL.
  let flightId = Object.keys(flights); // the flightId is going to be an array of the keys inside flights.

  if (flightId.includes(id)) {
    // if the array with the Ids contains the one we need, display the data of it.
    res.status(200).json({ status: 200, data: flights[id] });
  } else {
    res.status(400).json({ status: 400, error: "Flight not found" });
  }
};

const getReservations = (req, res) => {
  res.status(200).json({ status: 200, data: reservations });
};

const getSingleReservation = (req, res) => {
  let found = false; // create a variable of found'.
  console.log(req.params);
  reservations.forEach((singleRes) => {
    // for each reservations, we are going through to see if the Id is found
    if (singleRes.id === req.params.id) {
      res.status(200).json({ status: 200, data: singleRes }); // return the data.
      found = true; // the Id is found, so true.
    }
  });

  if (!found) {
    // if the Id is not found, return error.
    res
      .status(404)
      .json({ status: 404, error: "Could not find this reservation" });
  }
};

const addReservations = (req, res) => {
  console.log(req.body);
  let alreadyExists = false; // create a variable of 'alreadyExists'.

  flights[req.body.flight].forEach((seat) => {
    // for each seat of the flight the client is reserving, we are looking to see if the seat is available or not.
    if (seat.id === req.body.seat && seat.isAvailable === false) {
      alreadyExists = true; // if the seat is available, then it exists.
    } else if (seat.id === req.body.seat && seat.isAvailable === true) {
      seat.isAvailable = false; // if the seat is avaiable, then it not anymore after the reservation.
    }
  });

  reservations.forEach((singleRes) => {
    // for each reservations, if the email matches another email, then it exists.
    if (singleRes.email === req.body.email) {
      alreadyExists = true;
    }
  });

  if (alreadyExists) {
    // if the email or seat already exists(taken). Display message.
    res
      .status(400)
      .json({ status: 400, message: "This email/seat is already taken." });
  } else {
    // if the email or seat are not taken, then data equals the informations entered, id is created, we push the everything inside the reservations and display the message.
    let data = req.body;
    const id = uuidv4();
    data.id = id;
    reservations.push(data);
    res
      .status(201)
      .json({ status: 201, message: "Client registered", data: data });
  }
};

const deleteReservation = (req, res) => {
  let reservationExists = false; // create a variable of 'reservationExists'.
  let index = null; // create a variable of 'index'.

  reservations.forEach((singleRes, i) => {
    // in the reservations, for each reservation, if the id exists, then the reservation exists and we get the index of it.
    if (singleRes.id === req.params.id) {
      reservationExists = true;
      index = i;
    }
  });

  if (reservationExists) {
    // if the reservation exist, we can delete it.
    reservations.splice(index, 1);
    res
      .status(200)
      .json({ status: 200, message: "Reservation successfuly deleted" });
  } else {
    // if it doesn't exist, display the message.
    res.status(400).json({
      status: 400,
      error: "Id does not exist, no change to the reservation list",
    });
  }
};

const updateReservation = (req, res) => {
  let updateRes = reservations.find(
    (singleRes) => singleRes.id === req.params.id
  );
  if (updateRes) {
    updateRes = { ...req.body };
    res.status(200).json({
      status: 200,
      message: "The reservation has been successfully updated.",
      data: updateRes,
    });
  } else {
    res.status(400).json({
      status: 400,
      message: "There is no reservation under this ID number.",
    });
  }
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservations,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};

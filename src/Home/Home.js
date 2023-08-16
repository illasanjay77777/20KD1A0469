import React, { useState, useEffect } from "react";
import TrainDetails from "../Train/TrainDetails";
import "./Home.css";

export default function Home() {
  const [trains, setTrains] = useState([]);
  const token = localStorage.getItem("train-token");

  function customSort(a, b) {
    // Sort ascending by price
    const priceDiff = a.price.sleeper - b.price.sleeper;
    if (priceDiff !== 0) {
      return priceDiff;
    }

    // Sort descending by available sleeper seats
    const sleeperSeatsDiff =
      b.seatsAvailable.sleeper - a.seatsAvailable.sleeper;
    if (sleeperSeatsDiff !== 0) {
      return sleeperSeatsDiff;
    }

    // Sort ascending by departure time
    const departureTimeDiff =
      a.departureTime.Hours * 60 +
      a.departureTime.Minutes -
      (b.departureTime.Hours * 60 + b.departureTime.Minutes);
    return departureTimeDiff;
  }

  useEffect(() => {
    fetch("http://20.244.56.144/train/trains", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const dataUnderdepartureTime = data.filter((details) => {
          const departureTime = `${details.departureTime["Hours"]}-${details.departureTime.Minutes}-${details.departureTime.Seconds}`;
          const date = new Date();
          const curr = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
          if (departureTime < curr) return details;
        });
        setTrains(dataUnderdepartureTime.sort(customSort));
      });
  }, []);
  return (
    <div>
      <h1>Book Your Seat</h1>
      {trains.length ? (
        <div className="trainCardContainer">
          {trains.map((details, idx) => {
            return <TrainDetails key={idx} trainDetails={details} />;
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

// {companyName: 'Train Central',
//  clientID: '98be804a-810e-4d52-89ff-c3599d181cfa',
//  clientSecret: 'kbOarolUybOSXknL',
// ownerName: 'sanjay kiran',
// ownerEmail: 'illasanjaykirankiran@gmail.com', …}
// clientID
// :
// "98be804a-810e-4d52-89ff-c3599d181cfa"
// clientSecret
// :
// "kbOarolUybOSXknL"
// companyName
// :
// "Train Central"
// ownerEmail
// :
// "illasanjaykirankiran@gmail.com"
// ownerName
// :
// "sanjay kiran"
// rollNo
// :
// "20kd1a0469"

// {token_type: 'Bearer', access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2O…jkifQ.HnEMT9HR3exv0BEKeTKuEzwJZ4aN6MyFmS5OZEjpxUc', expires_in: 1692193781}
// access_token
// :
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIxOTM3ODEsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiOThiZTgwNGEtODEwZS00ZDUyLTg5ZmYtYzM1OTlkMTgxY2ZhIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjIwa2QxYTA0NjkifQ.HnEMT9HR3exv0BEKeTKuEzwJZ4aN6MyFmS5OZEjpxUc"
// expires_in
// :
// 1692193781
// token_type
// :
// "Bearer"

import React, { useState, useEffect } from "react";
import "./TrainDetails.css";
import { useParams } from "react-router";
import "./Train.css";

export default function Train() {
  const [train, setTrain] = useState(null);
  const { trainNumber } = useParams();
  const token = localStorage.getItem("train-token");
  useEffect(() => {
    fetch(`http://20.244.56.144/train/trains/${trainNumber}`, {
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
        setTrain(data);
      });
  }, []);
  return (
    <div>
      {train ? (
        <div className="train-trainCard">
          <div className="train-trainName">{train.trainName}</div>
          <div className="train-TrainNumber">
            Train Number: <strong>{train.trainNumber}</strong>
          </div>
          <div className="train-departureTime">
            Depature Time :{" "}
            <strong>
              <span>{train.departureTime.Hours} : </span>
              <span>{train.departureTime.Minutes} : </span>
              <span>{train.departureTime.Seconds}</span>
            </strong>
          </div>
          <div className="train-seatsAvailable">
            Seats Available :
            <div className="train-seatsAvailable-sleeper">
              Sleeper :<strong>{train.seatsAvailable["sleeper"]}</strong>
            </div>
            <div className="train-seatsAvailable-AC">
              AC :<strong>{train.seatsAvailable["AC"]}</strong>
            </div>
          </div>
          <div className="train-price">
            Price :
            <div className="train-price-sleeper">
              Sleeper : <strong>{train.price["sleeper"]}</strong>
            </div>
            <div className="train-price-AC">
              AC : <strong>{train.price["AC"]}</strong>
            </div>
          </div>
          <div className="train-delayedBy">
            Delayed By : <strong>{train.delayedBy}</strong>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

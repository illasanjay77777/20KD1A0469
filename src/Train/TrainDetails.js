import React from "react";
import "./TrainDetails.css";
import { useNavigate } from "react-router";

export default function TrainDetails(props) {
  const train = props.trainDetails;
  const navigate = useNavigate();
  return (
    <div
      className="trainCard"
      onClick={() => navigate(`/${train.trainNumber}`)}
    >
      <div className="trainName">{train.trainName}</div>
      <div className="TrainNumber">
        Train Number : <strong>{train.trainNumber}</strong>
      </div>
      <div className="departureTime">
        Depature Time :
        <strong>
          <span>{train.departureTime.Hours} : </span>
          <span>{train.departureTime.Minutes} : </span>
          <span>{train.departureTime.Seconds}</span>
        </strong>
      </div>
    </div>
  );
}

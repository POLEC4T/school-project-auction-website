import React from "react";
import Countdown from "react-countdown";

function Timer({ endDate, full }) {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {

    console.log(full)

    if (completed) {
      return <span>Enchère terminée !</span>;
    } else {
      return (
        <div>
          {full === "true" ? (
            <span>
              {days}j : {hours}h : {minutes}m : {seconds}s
            </span>
          ) : (
            <span>
              {days}j : {hours}h : {minutes}m
            </span>
          )}
        </div>
      );
    }
  };

  return (
    <div>
      <Countdown date={endDate} renderer={renderer} />
    </div>
  );
}

export default Timer;

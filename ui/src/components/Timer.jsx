import React from 'react';
import Countdown from 'react-countdown';

function Timer({endDate}) {

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span>Enchère terminée !</span>;
        } else {
            return (
                <div>
                    <span>{days}j : {hours}h : {minutes}m : {seconds}s</span>
                </div>
            )
        }
    };

    return (
        <div>
            <Countdown date={endDate} renderer={renderer} />
        </div>
    );
}

export default Timer;
import { useEffect, useState } from 'react';

interface TimerProps {
	from: number;
	setVisibleState?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Timer = ({ from, setVisibleState }: TimerProps) => {
	const [minutes, setMinutes] = useState(from);
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		const countdown = setInterval(() => {
			if (setVisibleState && minutes === 0 && seconds === 10) {
				setVisibleState(false);
			}
			if (seconds > 0) {
				setSeconds((prevSeconds) => prevSeconds - 1);
			} else {
				if (minutes === 0) {
					clearInterval(countdown);
				} else {
					setMinutes((prevMinutes) => prevMinutes - 1);
					setSeconds(59);
				}
			}
		}, 1000);

		return () => clearInterval(countdown);
	}, [minutes, seconds, setVisibleState]);

	// Format the time to display as HH:MM
	const formattedTime = `${String(minutes)}:${String(seconds).padStart(
		2,
		'0'
	)}`;

	return <div>{formattedTime}</div>;
};

Timer.defaultProps = {
	from: 5,
};

export default Timer;

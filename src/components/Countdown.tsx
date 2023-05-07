import { useEffect, useState } from "react";

interface CountDownProps {
    setCountdownFinished: (state: boolean) => void
    countdownEndDate: string
}

const Form = ({ setCountdownFinished, countdownEndDate }: CountDownProps) => {

    const [days, setDays] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    const formatTwoDigits = (value: any) => {
        if (value < 0) {
            return "00";
        }
        if (value.toString().length <= 1) {
            return `0${value}`;
        }
        return value;
    }


    const getCountdown = () => {

        const now = new Date();
        const nowInMilliseconds = Math.trunc(now.getTime() / 1000);

        const date = new Date(countdownEndDate);
        const dateInMilliseconds = Math.trunc(date.getTime() / 1000);
        
        if (dateInMilliseconds < nowInMilliseconds) {
            return setCountdownFinished(true)
        };

        const remainingDays =  Math.trunc((dateInMilliseconds - nowInMilliseconds) / 60 / 60 / 24);
        const remainingHours = Math.trunc((dateInMilliseconds - nowInMilliseconds) / 60 / 60) % 24;
        const remainingMinutes = Math.trunc((dateInMilliseconds - nowInMilliseconds) / 60) % 60;
        const remainingSeconds = (dateInMilliseconds - nowInMilliseconds) % 60;

        setDays(formatTwoDigits(remainingDays));
        setHours(formatTwoDigits(remainingHours));
        setMinutes(formatTwoDigits(remainingMinutes));
        setSeconds(formatTwoDigits(remainingSeconds));
    }

    useEffect(() => {
        window.setInterval(() => {
            getCountdown();
        }, 1000);
    })

    return (
        <div className="flex mt-6 gap-10 justify-center">
            <div>
                <p className="text-4xl font-bold">{days}</p>
                <span>days</span>
            </div>
            <div>
                <p className="text-4xl font-bold">{hours}</p>
                <span>hours</span>
            </div>
            <div>
                <p className="text-4xl font-bold">{minutes}</p>
                <span>minutes</span>
            </div>
            <div>
                <p className="text-4xl font-bold">{seconds}</p>
                <span>seconds</span>
            </div>
        </div>
    )
}

export default Form;

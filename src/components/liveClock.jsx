import { useState, useEffect } from 'react'
import '../i18n.jsx'
import { useTranslation } from "react-i18next";

export default function LiveClock(props) {

    const { t } = useTranslation()

    const updatedTime = props.lastVidStartTime //time passed from the parent component

    //state needed for the clock, keeps track of each individual component
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)
    const [days, setDays] = useState(0)

    let upOrDown = "up"
    updatedTime > new Date() ? upOrDown = "down" : upOrDown = "up" //check if the time is in the past or future

    //update the clock every second
    useEffect(() => {
        const updateClock = () => {
            const date = new Date()       
            const timeElapsed = Math.abs(date - updatedTime)
            setSeconds(Math.floor((timeElapsed / 1000) % 60))
            setMinutes(Math.floor((timeElapsed / (1000 * 60)) % 60))
            setHours(Math.floor((timeElapsed / (1000 * 60 * 60)) % 24))
            setDays(Math.floor(timeElapsed / (1000 * 60 * 60 * 24)))
        }
        updateClock()
        const interval = setInterval(updateClock, 1000)
        return () => clearInterval(interval)
    }, [updatedTime])
    
    //return the time as a p tag
    return (
        <>  
        <p className="liveClock">  </p>
            <p> 
                {upOrDown === "up" ? 
                    (days != 0 ? t("day", {days: days}) + " " : "") +  
                    (hours != 0 ? t("hour", {hours: hours}) + " " : "") +
                    (minutes != 0 ? t("minute", {minutes: minutes}) + " " : "") + 
                    (seconds != 0 ? t("second", {seconds: seconds}) + " " : "")
                    + t("ago") 
                : 
                    t("in") + " " + 
                    (days != 0 ? t("day", {days: days}) + " " : "") +  
                    (hours != 0 ? t("hour", {hours: hours}) + " " : "") +
                    (minutes != 0 ? t("minute", {minutes: minutes}) + " " : "") + 
                    (seconds != 0 ? t("second", {seconds: seconds}) + " " : "")
                } 
            </p>
        </>
        )
}
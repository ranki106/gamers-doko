import { useState, useEffect } from 'react'
import { appText } from "./appText.js"

export default function LiveClock(props) {
    const updatedTime = new Date(props.lastVidStartTime.getTime() + props.duration * 1000)
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)
    const [days, setDays] = useState(0)

    useEffect(() => {
        const updateClock = () => {
            const date = new Date()       
            const timeElapsed = date - updatedTime
            setSeconds(Math.floor((timeElapsed / 1000) % 60))
            setMinutes(Math.floor((timeElapsed / (1000 * 60)) % 60))
            setHours(Math.floor((timeElapsed / (1000 * 60 * 60)) % 24))
            setDays(Math.floor(timeElapsed / (1000 * 60 * 60 * 24)))
        }

        updateClock()
        const interval = setInterval(updateClock, 1000)
        return () => clearInterval(interval)
    }, [updatedTime])
    
    return (
        <div className="lastSeen">
            <p> {appText[props.language].lastSeen} {days} {appText[props.language].day} {hours} {appText[props.language].hour} {minutes} {appText[props.language].minute} {seconds} {appText[props.language].second} {appText[props.language].ago} </p>
        </div>
    )
}
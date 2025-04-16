import { useState, useEffect } from 'react'
import { appText } from "./appText.js"

export default function CountDownClock(props) {
    const updatedTime = new Date(props.liveIn.getTime())
   
    //state needed for the clock, keeps track of each individual component
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)
    const [days, setDays] = useState(0)

    //update the clock every second
    useEffect(() => {
        const updateClock = () => {
            const date = new Date()       
            const timeElapsed = updatedTime - date
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
        <div className="lastSeen">
            <p> {appText[props.language].next} {days} {appText[props.language].day} {hours} {appText[props.language].hour} {minutes} {appText[props.language].minute} {seconds} {appText[props.language].second} {appText[props.language].ago} </p>
        </div>
    )
}
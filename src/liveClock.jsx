export default function LiveClock(props) {
    const date = new Date()
    const updatedTime = new Date(props.lastVidStartTime.getTime() + props.duration * 1000)
    const lastVidTime = props.lastVidStartTime
    console.log("here", updatedTime)
    const timeElapsed = date - updatedTime
    console.log(timeElapsed)
    const seconds = Math.floor((timeElapsed / 1000) % 60)
    const minutes = Math.floor((timeElapsed / (1000 * 60)) % 60)
    const hours = Math.floor((timeElapsed / (1000 * 60 * 60)) % 24)
    const days = Math.floor(timeElapsed / (1000 * 60 * 60 * 24))

    return (
        <div className="lastSeen">
            <p> Time since last stream: {days} days, {hours} hours, {minutes} minutes, {seconds} seconds </p>
        </div>
    )
}
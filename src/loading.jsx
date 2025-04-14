import { useEffect, useState } from "react"

export default function LoadingScreen(props) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000) // 2 seconds delay

        return () => clearTimeout(timer)
    }, [props.gamer])

    return (
        <div className={`loading-screen ${loading ? '' : 'exit'}`} >

        </div>
    )
}
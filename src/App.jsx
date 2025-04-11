import { useState, useEffect } from 'react'
import { data } from './data.js'
import LiveClock from './liveClock.jsx'

function App() {
  //State variables
  const [gamer, setGamer] = useState(data[0])
  const [videos, setVideos] = useState([])
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  
  const date = new Date()
  console.log(date)

  //function to grab the last 25 videos from the Holodex API
  const checkLiveStatus = async () => {
    const channelID = gamer.channelID
    const API_KEY = import.meta.env.VITE_HOLODEX_API_KEY
    const url = `https://holodex.net/api/v2/channels/${channelID}/videos`
    try {
      const response = await fetch(url, {
        headers: {
          'X-APIKEY': API_KEY
        }
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      setVideos(data)
    } catch (err) {
      console.error('Failed to fetch videos from Holodex:', err)
    }
  }
  //create our buttons
  const gamersButtons = data.map((item) => {
    return (
      <button
        key={item.id}
        onClick={() => setGamer(item)}
        className="gamerButton"
        style={{ backgroundColor: item.backgroundColor }}
      >
        {item.oshiMark}
      </button>
    )
  })

    //derived variables from state
    const currentlyLive = videos.find(video => 
      video.status === 'live'
    )
    const lastVideo = videos.find(video =>
      video.status === 'past'
    )
    const lastVidURL = `https://www.youtube.com/watch?v=${lastVideo?.id}`
    const lastVidStartTime = new Date(lastVideo?.published_at)
    

    //useEffect to set the background color of the body and check live status
    //when the gamer state changes
    useEffect(() => {
      document.body.style.backgroundColor = gamer.backgroundColor
      document.getElementById('lastVidLink').style.backgroundColor = gamer.accentColor3
      checkLiveStatus()
    }, [gamer])



  //our main return
  return (
    <section>
      <section className="gamerSelect">
        {gamersButtons}
      </section>
      <h1>{gamer.name} Doko?</h1>
        <LiveClock 
          lastVidStartTime={lastVidStartTime}
          duration={lastVideo?.duration}
        />
     
      <div id="lastVidLink" className="lastVideo">
        {currentlyLive ? 
          <>
            <p>{gamer.name} is live now!</p>
          </>  
        : 
          <>
            <p>
              <a href={lastVidURL}>{lastVideo ? lastVideo.title : "Nothing to display!"}</a>
            </p>
          </>
        }
      </div>
    </section>
  )
}

export default App

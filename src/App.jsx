import { useState, useEffect } from 'react'
import { data } from './data.js'
import LiveClock from './liveClock.jsx'
import { appText } from "./appText.js"
import LoadingScreen from './loading.jsx'

function App() {
  //State variables
  const [language, setLanguage] = useState("en")
  const [gamer, setGamer] = useState(data[0])
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(true)

  console.log(appText[language])



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
        onClick={() => updateGamer(item)}
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
  const lastVidStartTime = new Date(lastVideo?.available_at)
  

  //useEffect to set the background color of the body and check live status
  //when the gamer state changes
  useEffect(() => {
    document.body.style.backgroundColor = gamer.backgroundColor
    if(ready) document.getElementById('lastVidLink').style.backgroundColor = gamer.accentColor3
    checkLiveStatus()
  }, [gamer])

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value
    setLanguage(selectedLanguage)
    console.log(`Language changed to: ${selectedLanguage}`)
  }


  //function to update the gamer state and set loading state
  //this function is called when the user clicks on a button
  //it also sets a timeout to simulate loading
  function updateGamer(item) {
    if(item.id === gamer.id) return

    setLoading(true)
    setTimeout(() => {
      setReady(false)    
    }, 1000) 

    setTimeout(() => {
      setGamer(item)
      setReady(true)
    }, 1000) // 2 seconds delay

    setTimeout(() => {
      setLoading(false)
    }, 2000) 
  }  

  //main return to display on the page
  return (
    <section>
      <div className={`loading-screen ${loading ? '' : 'exit'}`} />
      {ready && (
        <>
        <section className="gamerSelect">
          {gamersButtons}
        </section>
        <h1>{language === 'ja' ? gamer.japaneseName : gamer.name}{language==='ja' ? "": " "}{appText[language].doko}</h1>
          <LiveClock 
            lastVidStartTime={lastVidStartTime}
            duration={lastVideo?.duration}
            gamer={gamer}
            language={language}
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
      
      
      
      
        <div className="static-info">
          <select onChange={handleLanguageChange} className="language-select"> 
            <option value="en">English / 英語</option>
            <option value="ja">Japanese / 日本語</option>
          </select>
          <p> {appText[language].affiliation} </p>
          <p> <a href="google.com">{appText[language].about} </a></p>
          <p> <a href="google.com">{appText[language].sourceCode}</a> </p>
        </div>
        
      </>)}
    </section>
  )
}

export default App

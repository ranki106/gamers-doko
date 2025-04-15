import { useState, useEffect } from 'react'
import { data } from './data.js'
import LiveClock from './liveClock.jsx'
import { appText } from "./appText.js"
import clsx from 'clsx'
import Confetti from 'react-confetti'

function App() {
  //State variables
  const [language, setLanguage] = useState("en")
  const [gamer, setGamer] = useState(data[0])
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(true)

  console.log("Gamer: ", videos)

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
  const buttonStyles = {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
    margin: '10px',
  }
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

  const currentVidURL = `https://www.youtube.com/watch?v=${currentlyLive?.id}`
  
  //update className based on the gamer's id
  const className = clsx({
    korone: gamer.id === 1,
    okayu: gamer.id === 2,
    fubuki: gamer.id === 3,
    mio: gamer.id === 4,
  })

  //useEffect to set the background color of the body and check live status
  //when the gamer state changes
  useEffect(() => {
    document.body.style.backgroundColor = gamer.backgroundColor
    document.body.style.color = gamer.textColor
    document.getElementById('loading-screen').style.backgroundColor = gamer.backgroundColor
    if(ready) document.getElementById('lastVidLink').style.backgroundColor = gamer.accentColor1
    checkLiveStatus()
  }, [gamer])

  //handles our language change. 
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value
    setLanguage(selectedLanguage)
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
  
  //react-youtube settings
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
    },
  }


  //main return to display on the page
  return (
    <section>

      {/* Loading screen */}
      <div id="loading-screen" className={`loading-screen ${loading ? '' : 'exit'} ${className}`}>
        <h1>🌽🌲 Gamers Doko 🍙🥐</h1>
      </div>

      {/* Once we are loaded we load the full page */}
      {ready && (
        <>
          {/* Confetti when the page loads */}
          

          {/* Buttons at the top of the page */}
          <section className="gamerSelect">
            {gamersButtons}
          </section>

          {/* Title of the main page */}
          <h1 className="title">{language === 'ja' ? gamer.japaneseName : gamer.name}{language==='ja' ? "": " "}{appText[language].doko}</h1>
          
          {/* Either shows that the gamer is live or their last stream title */}
          <div id="lastVidLink" className="lastVideo">
            
            {currentlyLive ?
              <>
                <p>{language === 'ja' ? `${gamer.japaneseName} ${appText[language].live}` : `${gamer.name} ${appText[language].live}`}</p>
              
                <div className="img-container">
                  <a href={currentVidURL}>
                    <img className="lastVidThumb" src={`https://img.youtube.com/vi/${currentlyLive?.id}/mqdefault.jpg`} alt="Gamer Logo" />
                  </a>
                  <p className="lastVidTitle">
                    <a href={currentVidURL}>{currentlyLive ? currentlyLive.title : "Nothing to display!"}</a>
                  </p>
              </div>
            </> 
            :
              <>
                <LiveClock 
                  lastVidStartTime={lastVidStartTime}
                  duration={lastVideo?.duration}
                  gamer={gamer}
                  language={language}
                />
                
                <p> {appText[language].lastStream} </p>
                <div className="img-container">
                  <a href={lastVidURL}>
                    <img className="lastVidThumb" src={`https://img.youtube.com/vi/${lastVideo?.id}/mqdefault.jpg`} alt="Gamer Logo" />
                  </a>
                  <p className="lastVidTitle">
                    <a href={lastVidURL}>{lastVideo ? lastVideo.title : "Nothing to display!"}</a>
                  </p>
                </div>
              </>
            }
            
          </div>
        
        
        
          {/* The info that is at the bottom of the screen always */}
            <footer className="static-info">
              <select onChange={handleLanguageChange} className="language-select"> 
                <option value="en">English / 英語</option>
                <option value="ja">Japanese / 日本語</option>
              </select>
              <p> {appText[language].affiliation} </p>
              <p> <a href="google.com">{appText[language].about} </a></p>
              <p> <a href="https://github.com/ranki106/gamers-doko">{appText[language].sourceCode}</a> </p>
            </footer>
      </>)}
    </section>
  )
}

export default App

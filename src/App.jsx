import { useState, useEffect } from 'react'
import { data } from './data.js'
import LiveClock from './liveClock.jsx'
import { appText } from "./appText.js"
import Confetti from 'react-confetti'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './i18n.jsx'
import i18next from "i18next";
import { useTranslation } from "react-i18next";


function App() {
  //State variables
  const [language, setLanguage] = useState(i18next.language) //selected language
  const [gamer, setGamer] = useState(data[0])    //currently selected gamer
  const [videos, setVideos] = useState({         //currently cached video data from the API
    korone: [],
    okayu: [],
    fubuki: [],
    mio: [],
  })

  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const day = t("day")
  const doko = t("doko")
  const about = t("about")
  const sourceCode = t("sourceCode")
  const affiliation = t("affiliation")
  const lastStream = t("lastStream")
  const live = t("live")
  const next = t("next")
  const english = t("english")
  const japanese = t("japanese")


  //function to grab the last 25 videos from the Holodex API
  const checkLiveStatus = async () => {
    if(videos[gamer.id].length !== 0) {
      return
    }

    //if data hasnt been fetched then we need to fetch it
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
      setVideos(prevState => ({
        ...prevState,
        [gamer.id]: data
      }))
    } catch (err) {
      console.error('Failed to fetch videos from Holodex:', err)
    }
  }

  //find the last current live video if there is such a thing
  const currentlyLive = videos[gamer.id].find(video => 
    video.status === 'live'
  )
  const currentVidURL = `https://www.youtube.com/watch?v=${currentlyLive?.id}`

  //find the last video that is not live
  const lastVideo = videos[gamer.id].find(video =>
    video.status === 'past'
  )
  const lastVidURL = `https://www.youtube.com/watch?v=${lastVideo?.id}`
  const lastVidStartTime = new Date(lastVideo?.available_at)
  
  //find the next upcoming video
  const upcomingVideos = []
  videos[gamer.id].forEach(video => {
    if(video.status === 'upcoming') {
      upcomingVideos.push(video)
    } 
  })


  function getUpcomingVideos() {
    if(upcomingVideos.length === 0) {
      return null
    } else {
      let closestDate = new Date(upcomingVideos[0].available_at)
      let nextVideo = upcomingVideos[0]
      upcomingVideos.forEach(video => {
        const date = new Date(video.available_at)
        if(date < closestDate) {
          closestDate = date
          nextVideo = video
        }
      })   
      const today = new Date()
      const oneMonthLater = new Date()
      oneMonthLater.setMonth(today.getMonth() + 1)
      if(closestDate > oneMonthLater) {
        return null
      }
      const nextVidURL = `https://www.youtube.com/watch?v=${nextVideo?.id}`      
      return (
        <div className="lastVideo">
          <h2> {next} </h2>
          <LiveClock 
            lastVidStartTime={new Date(nextVideo?.available_at)}
          />
          <div className="img-container">
              <a href={nextVidURL}>
                <img className="lastVidThumb" src={`https://img.youtube.com/vi/${nextVideo?.id}/mqdefault.jpg`} alt="Gamer Logo" />
              </a>
              <p className="lastVidTitle">
                <a href={nextVidURL}>{nextVideo ? nextVideo.title : "Nothing to display!"}</a>
              </p>
          </div>
        </div>
      )
    }
  }

  //checks if today is any members birthday or debut
  function checkBirthdayOrDebut(date) {
    const today = new Date()
    const passedIn = new Date(date)
    const isToday = today.getDate() === passedIn.getDate() && today.getMonth() === passedIn.getMonth()
    return isToday
  }

  //useEffect to set the background color of the body and check live status
  //when the gamer state changes
  useEffect(() => {
    document.body.style.backgroundColor = gamer.backgroundColor
    document.body.style.color = gamer.textColor
    checkLiveStatus()
  }, [gamer])

  //handles our language change. 
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value)
    i18n.changeLanguage(event.target.value);
  }
  
  return (
    <section>
      
      <Box 
        sx={{ 
          width: '100vw', 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          zIndex: 999, 
          backgroundColor: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between', // Space between left, center, and right
          alignItems: 'flex-end',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          height: '64px',
          paddingX: 2
        }}
      >
        {/* Left spacer to balance layout */}
        <Box sx={{ width: '25%' }} />

        {/* Centered Tabs */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Tabs
            value={false}
            sx={{
              height: '100%',
              alignItems: 'flex-end',
              backgroundColor: '#f5f5f5',
              borderRadius: '12px 12px 0 0',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              minHeight: '64px',
            }}
          >
            {data.map((item) => (
              <Tab
                key={item.id}
                label={item.oshiMark}
                onClick={() => setGamer(item)}
                sx={{
                  backgroundColor: item.backgroundColor,
                  color: gamer.textColor,
                  fontSize: '1.5rem',
                  borderRadius: '10px 10px 0 0',
                  marginX: '4px',
                  minWidth: '50px',
                  height: '100%',
                  textTransform: 'none',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.2s ease',
                  }
                }}
              />
            ))}
          </Tabs>
        </Box>
        
        {/* Right-aligned select */}
        <Box sx={{ width: '25%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight: '1rem' }}>
          <select onChange={handleLanguageChange} className="language-select" style={{ marginRight: '1rem' }}>
            <option value="en">{english}</option>
            <option value="ja">{japanese}</option>
          </select>
        </Box>
      </Box>

      {/* This div is so that the tabs dont cover anything up*/}
      <div style={{ paddingTop: '56px', visibility: "hidden" }}></div> {/* Height of tabs */}

      {/* Once we are loaded we load the full page */}
      <>
        {/* Confetti when the page loads */}
        {checkBirthdayOrDebut(gamer.birthday) || checkBirthdayOrDebut(gamer.debut) ? 
          <Confetti 
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={500}
            recycle={false}
            colors={[gamer.accentColor1, gamer.accentColor2, gamer.accentColor3]}
          /> 
        : 
          null
        }

        {/* Title of the main page */}
        <h1 className="title">{language === 'ja' ? gamer.japaneseName : gamer.name}{language==='ja' ? "": " "}{doko}</h1>
        
        {/* Either shows that the gamer is live or their last stream title */}
        <div id="lastVidLink" className="lastVideo">
          {currentlyLive ?
            <>
              <p>{language === 'ja' ? `${gamer.japaneseName} ${live}` : `${gamer.name} ${live}`}</p>
            
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
              <h2> {lastStream} </h2>
              <LiveClock 
                lastVidStartTime={new Date(lastVidStartTime.getTime() + lastVideo?.duration * 1000) }
              />
              
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
        
        {/* The next stream is the first upcoming video */}
        {getUpcomingVideos()}

        {/* The info that is at the bottom of the screen always */}
        <footer className="static-info">
          <p> {affiliation} </p>
          <p> <a href={`https://www.youtube.com/channel/${gamer.channelID}`}> {language === 'ja' ? gamer.japaneseName : gamer.name} ch. </a></p>
          <p> <a href="google.com">{about} </a></p>
          <p> <a href="https://github.com/ranki106/gamers-doko">{sourceCode}</a> </p>
        </footer>
      </>
    </section>
  )
}

export default App

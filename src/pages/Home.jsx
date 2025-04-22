import React, { useState, useEffect } from 'react';
import { data } from '../data.js';
import Confetti from 'react-confetti';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../i18n.jsx';
import { useTranslation } from 'react-i18next';
import BottomElements from '../components/bottomElements.jsx';
import VideoContainer from '../components/videoContainer.jsx';
import Images from '../components/images.jsx';

function Home({ language, onLanguageChange }) {
  const { t } = useTranslation();

  const [gamer, setGamer] = useState(data[0]); //currently selected gamer
  const [videos, setVideos] = useState({
    korone: [],
    okayu: [],
    fubuki: [],
    mio: [],
  });

  const checkLiveStatus = async () => {
    if (videos[gamer.id].length !== 0) {
      return;
    }

    const channelID = gamer.channelID;
    const API_KEY = import.meta.env.VITE_HOLODEX_API_KEY;
    const url = `https://holodex.net/api/v2/channels/${channelID}/videos`;
    try {
      const response = await fetch(url, {
        headers: {
          'X-APIKEY': API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setVideos((prevState) => ({
        ...prevState,
        [gamer.id]: data,
      }));
    } catch (err) {
      console.error('Failed to fetch videos from Holodex:', err);
    }
  };

  const currentlyLive = videos[gamer.id].find((video) => video.status === 'live');
  const lastVideo = videos[gamer.id].find((video) => video.status === 'past');
  const upcomingVideos = [];
  videos[gamer.id].forEach((video) => {
    if (video.status === 'upcoming') {
      upcomingVideos.push(video);
    }
  });

  function getUpcomingVideos() {
    if (upcomingVideos.length === 0) {
      return null;
    } else {
      let closestDate = new Date(upcomingVideos[0].available_at);
      let nextVideo = upcomingVideos[0];
      upcomingVideos.forEach((video) => {
        const date = new Date(video.available_at);
        if (date < closestDate) {
          closestDate = date;
          nextVideo = video;
        }
      });
      const today = new Date();
      const oneMonthLater = new Date();
      oneMonthLater.setMonth(today.getMonth() + 1);
      if (closestDate > oneMonthLater) {
        return null;
      }
      return (
        <VideoContainer
          video={nextVideo}
          backgroundColor={gamer.accentColor1}
        />
      );
    }
  }

  function checkDate(date) {
    const today = new Date();
    const passedIn = new Date(date);
    const isToday =
      today.getDate() === passedIn.getDate() && today.getMonth() === passedIn.getMonth();
    return isToday;
  }

  useEffect(() => {
    document.body.style.backgroundColor = gamer.backgroundColor;
    document.body.style.color = gamer.textColor;
    checkLiveStatus();
  }, [gamer]);

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
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          height: '64px',
          paddingX: 2,
        }}
      >
        <Box sx={{ width: '25%' }} />

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
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        <Box
          sx={{
            width: '25%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginRight: '1rem',
          }}
        >
          <select
            value={language}
            onChange={onLanguageChange}
            className="language-select"
            style={{ marginRight: '1rem' }}
          >
            <option value="en">{t('english')}</option>
            <option value="ja">{t('japanese')}</option>
          </select>
        </Box>
      </Box>

      <div style={{ paddingTop: '56px', visibility: 'hidden' }}></div>

      <>
        {checkDate(gamer.birthday) || checkDate(gamer.debut) ? (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={500}
            recycle={false}
            colors={[gamer.accentColor1, gamer.accentColor2, gamer.accentColor3]}
          />
        ) : null}
        <h1 className="title">
          {language === 'ja' ? gamer.japaneseName : gamer.name + " "}
          {t("doko")}
        </h1>

        

        {currentlyLive ? (
          <>
            <Images
              imgSrc={gamer.onlineImg}
            />
            <VideoContainer
              name={language === 'ja' ? gamer.japaneseName : gamer.name + " "}
              video={currentlyLive}
              backgroundColor={gamer.accentColor1}
            />
          </>
        ) : (
          <>
            <Images
              imgSrc={gamer.offlineImg}
            />
            <VideoContainer
              video={lastVideo}
              backgroundColor={gamer.accentColor1}
            />
          </>
        )}
        {getUpcomingVideos()}
        <BottomElements 
          gamer={gamer}
          language={language}
          backgroundColor={gamer.accentColor1}
        />
      </>
    </section>
  );
}

export default Home;

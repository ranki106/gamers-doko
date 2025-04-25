import { useTranslation } from 'react-i18next';
import '../i18n.jsx';
import LiveClock from './liveClock.jsx';

export default function VideoContainer({ video, name, backgroundColor }) {
    const { t } = useTranslation();
    const URL = `https://www.youtube.com/watch?v=${video?.id}`;
    return (
        <div className="lastVideo" style={{ backgroundColor: backgroundColor }}>
            {video ? 
            <>
                <h2> {video?.status === "live" ? name + t('live') : (video?.status === "past" ? t('lastStream') : t('next'))} </h2>
                {video?.status === "live" ? null : <LiveClock lastVidStartTime={new Date(video?.available_at)} />}
                <div className="img-container">
                <a href={URL}>
                    <img
                        className="lastVidThumb"
                        src={`https://img.youtube.com/vi/${video?.id}/mqdefault.jpg`}
                        alt="Gamer Logo"
                    />
                </a>
                <p className="lastVidTitle">
                    <a href={URL}>{video ? video?.title : 'Nothing to display!'}</a>
                </p>
                </div>
            </>
            :
            <p> {t('loading')}</p>
            }
        </div>
    );
}
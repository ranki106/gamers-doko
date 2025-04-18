import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../i18n.jsx';
import BottomElements from '../components/bottomElements.jsx';

function About({ language, onLanguageChange }) {
    const { t } = useTranslation();

    useEffect(() => {
        document.body.style.backgroundColor = "rgba(0, 255, 255, 0.15)"; // Set a light background color for the About page
    }, []);

    return (
        <section className="aboutPage" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>{t('about.returnHome')}</Link>
                <select value={language} onChange={onLanguageChange} className="language-select">
                    <option value="en">{t('english')}</option>
                    <option value="ja">{t('japanese')}</option>
                </select>
            </div>
            
            <h1>{t('about.title')}</h1>
            <p>{t('about.description')}</p>
            <p>{t('about.disclaimer')}</p>

            
            <h2>{t('about.credits')}</h2>
            <p>{t('about.creator')} - X: <a target="_blank" href="https://www.twitter.com/slaphappypuppy1" rel="noopener noreferrer"> @slaphappypuppy1</a></p>
            <p>{t('about.credits.artist')} - X: <a target="_blank" href="https://www.twitter.com/village0225NK" rel="noopener noreferrer"> @village0225NK</a></p>
            <p>{t('about.credits.translator')} - X: <a target="_blank" href="https://www.twitter.com/slaphappypuppy1" rel="noopener noreferrer"> @slaphappypuppy1</a></p>
            <p>{t('about.credits.api')} <a target="_blank" href="https://docs.holodex.net" rel="noopener noreferrer"> HoloDex</a></p>
            <p>{t('about.credits.inspriation')}</p>

            <p>https://docs.holodex.net</p>

            <BottomElements />
        </section>
    );
}

export default About;

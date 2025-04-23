import { useTranslation } from 'react-i18next';
import '../i18n.jsx';

export default function BottomElements(props) {
    const { t } = useTranslation();
    
    return (
        <footer className="static-info">
          <p> {t("affiliation")} </p>
          {props.gamer ? <p>
            <a href={`https://www.youtube.com/channel/${props.gamer.channelID}`}>
              {props.language === 'ja' ? props.gamer.japaneseName : props.gamer.name} ch.
            </a>
          </p> : null}
          <p>
            <a href="/about">{t("about")}</a>
          </p>
          <p>
            <a href="https://github.com/ranki106/gamers-doko">{t("sourceCode")}</a>
          </p>
        </footer>
    )
}
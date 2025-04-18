import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import i18next from 'i18next';

function App() {
  const [language, setLanguage] = useState(i18next.language); // Shared language state

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18next.changeLanguage(selectedLanguage); // Update i18next language
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home language={language} onLanguageChange={handleLanguageChange} />}
        />
        <Route
          path="/about"
          element={<About language={language} onLanguageChange={handleLanguageChange} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

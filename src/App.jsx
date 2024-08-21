import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Blog from './pages/Blog';
import './styles/css/styles.css';
import LainNya from "./pages/LainNya";
import Header from "./components/Header";

function App() {
  return (
      <Router>
          <div className="main-container container">
              <div className="main-header-container dark">
                  <Header/>
              </div>
                  <Routes>
                      <Route path="/" element={<Blog/>}/>
                      <Route path="/blog" element={<Blog/>}/>
                      <Route path="/lain_nya" element={<LainNya/>}/>
                  </Routes>
              </div>
      </Router>
);
}

export default App;

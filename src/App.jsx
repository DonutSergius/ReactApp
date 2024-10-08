import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './styles/css/styles.css';
import Blog from './pages/Blog';
import LainNya from "./pages/LainNya";
import Header from "./components/Header";

function App() {
    return (
        <Router>
            <div className="container">
                <div className="header-container dark">
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

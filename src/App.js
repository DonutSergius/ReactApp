import Blog from './pages/Blog';
import Header from "./components/Header";
import './styles/css/styles.css';

function App() {
  return (
    <div className="main-container container">
        <Header />
        <Blog />
    </div>
  );
}

export default App;

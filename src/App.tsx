import './App.css';
import './styles.css';
import { Header, Footer, MoviesGrid } from './components';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <MoviesGrid />
      </div>
      <Footer />
    </div>
  );
}

export default App;

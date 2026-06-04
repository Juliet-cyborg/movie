import './App.css';
import './styles.css'
import {Header} from "./components";

function App() {

  return (
   <div className="App">
       <div className='container'>

     <Header/>
       </div>
     <footer className='footer'>
       <p>Footer content</p>
     </footer>
   </div>
  );
}

export default App;

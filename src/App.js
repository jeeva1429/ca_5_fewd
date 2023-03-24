import logo from './logo.svg';
import './App.css';
import BooksData from './Componets/BooksData';
import Registration from './Componets/Registration';
import { Route , Routes, redirect, S} from 'react-router-dom';
function App() {
  return (
    // <div className="App">
     <>

      <Routes>
        <Route exact path='/' element={<BooksData/>}></Route>
        <Route path='/register' element={<Registration/>}></Route>
    </Routes>
    </>
    // </div>
  );
}

export default App;

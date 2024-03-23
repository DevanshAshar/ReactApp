import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Private from './components/Routes/Private';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/user' element={<Private/>}>
          <Route path='dashboard' element={<Dashboard/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

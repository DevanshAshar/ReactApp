import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Private from './components/Routes/Private';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AddApplication from './pages/AddApplication';
import Applications from './pages/Applications';
import Applied from './pages/Applied';
import PastPostings from './pages/PastPostings';
import MyApplied from './pages/MyApplied';
import AboutUs from './pages/AboutUs';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/user' element={<Private/>}>
          <Route path='profile' element={<Profile/>}/>
          <Route path='applications' element={<Applications/>}/>
        </Route>
        <Route path='pastPostings' element={<PastPostings/>}/>
        <Route path='applied/:id' element={<Applied/>}/>
        <Route path='addApplication' element={<AddApplication/>}/>
        <Route path='myApplied' element={<MyApplied/>}/>
      </Routes>
    </div>
  );
}

export default App;

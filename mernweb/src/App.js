import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Appointment from './components/Appointment';
import {Route,Routes} from 'react-router-dom';
function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route exact path ='/' element={<Home/>}/>
      <Route exact path ='/about' element={<About/>}/>
      <Route exact path ='/service' element={<Services/>}/>
      <Route exact path ='/contact' element={<Contact/>}/>
      <Route exact path ='/login' element={<Login/>}/>
      <Route exact path ='/register' element={<Register/>}/>
      <Route exact path ='/appointment' element={<Appointment/>}/>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;

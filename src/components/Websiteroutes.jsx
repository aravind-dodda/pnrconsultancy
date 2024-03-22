import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Positionslist from '../pages/Positionslist';
import Footer from './Footer';
import Contact from '../pages/Contact';
import Aboutus from '../pages/Aboutus';
import NavigationBar from './Navbar';


const Websiteroutes = () => {
  return (
    <>
     <NavigationBar />
      <Routes>
        <Route path="/"
          element={
            <Home />
          }>
        </Route>
        <Route path="/home"
          element={
            <Home />
          }>
        </Route>
        <Route path="/positionslist"
          element={
            <Positionslist />
          }>


        </Route>
        <Route path="/contact"
          element={
            <Contact />
          }
          

        ></Route>
        <Route path="/aboutus"
          element={
            <Aboutus />
          }
          

        ></Route>


      </Routes>
      <Footer />
    </>
  )
}

export default Websiteroutes
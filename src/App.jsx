import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
// import useStore from './zustand/store';
import './App.css'
import Home from './pages/Home';
import Positionslist from './pages/Positionslist';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';
import Aboutus from './pages/Aboutus';


function App() {
  // const inc = useStore(state => state.inc);
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/"
          element={
            <>
              <Home />
            </>
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
    </BrowserRouter>
  );
}

export default App;

// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageAnimation";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";
import BubbleBackground from "./background/AnimatedBackground";
import Cursor from "./components/Cursor";

function App() {
  return (
    <Router>
      <Navbar/>   
      <BubbleBackground/> 
      <Cursor/>
      <PageTransition>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/work" element={<Work/>} />
        </Routes>
      </PageTransition>
    </Router>
  );
}

export default App;

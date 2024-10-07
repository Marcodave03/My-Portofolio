import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BubbleBackground from './background/AnimatedBackground';
import Cursor from './components/Cursor';
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";
import { AnimatePresence } from "framer-motion";
import Transition from "./transition";
import { useLocation } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <BubbleBackground />
      <Cursor />
      <MainRoutes /> 
    </Router>
  );
}

const MainRoutes = () => {
  const location = useLocation(); 

  return (
    <AnimatePresence>
      <Routes location={location} key={location.key}>
        <Route path="/" element={<Transition Component={Welcome} navigateTo="/home" />} />
        <Route path="/home" element={<Transition Component={Home} />} />
        <Route path="/about" element={<Transition Component={About} />} />
        <Route path="/work" element={<Transition Component={Work} />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;

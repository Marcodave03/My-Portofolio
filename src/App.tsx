import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import PageAnimation from "./components/PageAnimation";
import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";
import BubbleBackground from "./background/AnimatedBackground";
import Cursor from "./components/Cursor";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <Navbar />
      <BubbleBackground />

      <Cursor />
      <AnimatedRoutes />
    </Router>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <PageAnimation>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
        </Routes>
      </PageAnimation>
    </>
  );
}

export default App;

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
// } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import PageAnimation from "./components/PageAnimation";
// import Home from "./pages/Home";
// import Work from "./pages/Work";
// import About from "./pages/About";
// import Projects from "./pages/Projects";
// import BubbleBackground from "./background/AnimatedBackground";
// import Cursor from "./components/Cursor";
// import ScrollToTop from "./components/ScrollToTop";
// import NotFound from './pages/404';
// import Footer from "./components/Footer";

// const location = useLocation();

// function App() {
  

//   return (
//     <Router>
//       <Navbar />
//       <BubbleBackground />
//       <Cursor />
//       <AnimatedRoutes />
//       {/* <Footer /> */}
//       {location.pathname !== "/work" && <Footer />}
//     </Router>
//   );
// }

// function AnimatedRoutes() {
//   const location = useLocation();
//   return (
//     <>
//       <ScrollToTop/>
//       <PageAnimation>
//         <Routes location={location} key={location.pathname}>
//           <Route path="/" element={<Home />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/work" element={<Work />} />
//           <Route path="/project/:projectId" element={<Projects />} />
//           <Route path="*" element={<NotFound/>} /> 
//         </Routes>
//       </PageAnimation>
//     </>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import PageAnimation from "./components/PageAnimation"
import Home from "./pages/Home"
import Work from "./pages/Work"
import About from "./pages/About"
import Projects from "./pages/Projects"
import BubbleBackground from "./background/AnimatedBackground"
import Cursor from "./components/Cursor"
import ScrollToTop from "./components/ScrollToTop"
import NotFound from "./pages/404"
import Footer from "./components/Footer"

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

function AppContent() {
  const location = useLocation()

  return (
    <>
      <Navbar />
      <BubbleBackground />
      <Cursor />
      <AnimatedRoutes />
      {location.pathname !== "/work" && <Footer />}
    </>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <>
      <ScrollToTop />
      <PageAnimation>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/project/:projectId" element={<Projects />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageAnimation>
    </>
  )
}

export default App


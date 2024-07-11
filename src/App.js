import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Imprint from "./components/sections/Imprint";
import NotFound from "./components/sections/NotFound";
import Blog from "./components/sections/Blog";

import LoadingScreen from "./components/layout/LoadingScreen";
import ProjectDetails from "./components/sections/ProjectDetails";
import Home from "./components/sections/Home";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <LoadingScreen />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/imprint" element={<Imprint />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

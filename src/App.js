import { RouterProvider } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

import LoadingScreen from "./components/layout/LoadingScreen";
import { router } from "./router";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="App">
        <Header />
        <LoadingScreen />
        <RouterProvider router={router} />
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;

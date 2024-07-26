import { RouterProvider } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

import LoadingScreen from "./components/layout/LoadingScreen";
import { router } from "./router";

function App() {
  return (
    <div className="App">
      <Header />
      <LoadingScreen />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;

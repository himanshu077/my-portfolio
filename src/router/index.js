import {
  Outlet,
  Route,
  ScrollRestoration,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Imprint from "../components/sections/Imprint";
import NotFound from "../components/sections/NotFound";
import ProjectDetails from "../components/sections/ProjectDetails";
import Home from "../components/sections/Home";
import Blog from "../components/sections/Blog";

const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<Home />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/project/:id" element={<ProjectDetails />} />
    <Route path="/imprint" element={<Imprint />} />
    <Route path="*" element={<NotFound />} />
  </>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollRestoration />
        <Outlet />
      </>
    ),
    children: routes,
  },
]);

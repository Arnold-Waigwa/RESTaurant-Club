// App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DetailView from "./components/DetailView";
import About from "./components/About";
import { useRoutes } from "react-router-dom";

const App = () => {
  // Define routes with useRoutes
  const routes = useRoutes([
    { path: "/", element: <Hero /> },
    { path: "/about", element: <About /> },
    { path: "/about/:cityName", element: <DetailView /> },
  ]);

  return (
    <div>
      <Navbar /> {/* Navbar always visible */}
      {routes} {/* Display routes here */}
    </div>
  );
};

export default App;

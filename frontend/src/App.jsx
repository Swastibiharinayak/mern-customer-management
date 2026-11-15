import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateCustomerPage from "./pages/CreateCustomerPage";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
      }`}
    >
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Create" element={<CreateCustomerPage />} />
        <Route path="/edit/:id" element={<CreateCustomerPage />} />
      </Routes>
    </div>
  );
}

export default App;

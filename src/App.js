import "./App.css";
import Menu from "./components/Menu";
import Header from "./components/Header";
import List from "./components/List";
import ComingUp from "./components/ComingUp";
import { useState } from "react";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./components/Login";

function App() {
  const [homepage, setHomepage] = useState(false);

  return (
    <div className="App">
      <Header homepage={homepage} />
      <div className="main">
        <Menu setHomepage={setHomepage} />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/comingup" element={<ComingUp />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

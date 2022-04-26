import "./App.css";
import Menu from "./components/Menu";
import Header from "./components/Header";
import List from "./components/List";
import ComingUp from "./components/ComingUp";
import { useContext, useState } from "react";
import { Context } from "./Context";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [homepage, setHomepage] = useState(false);

  return (
    <div className="App">
      <Header homepage={homepage} />
      <div className="main">
        <Menu setHomepage={setHomepage} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/comingup" element={<ComingUp />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

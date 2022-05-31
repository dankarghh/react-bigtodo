import "./App.css";
import Menu from "./components/Menu";
import Header from "./components/Header";
import List from "./components/List";
import ComingUp from "./components/ComingUp";
import { useContext, useState } from "react";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import { Context } from "./Context";
import { auth } from "./firebase-config";
import Login from "./components/Login";

function App() {
  const [homepage, setHomepage] = useState(false);
  const user = useContext(Context);

  console.log(user);

  return (
    <div className="App">
      <Header homepage={homepage} />
      {user.user ? (
        <div className="main">
          <Menu setHomepage={setHomepage} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/comingup" element={<ComingUp />} />
            <Route path="/list" element={<List />} />
          </Routes>
        </div>
      ) : (
        <Login />
      )}
      <Footer />
    </div>
  );
}

export default App;

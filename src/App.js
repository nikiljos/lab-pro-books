import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import BookDetail from "./components/BookDetail";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import SignUp from "./components/SignUp";

function App() {

  let [loginStatus, updateLoginStatus] = useState({
    loggedIn: false,
    name: "",
  });

  return (
    <div className="App">
      <NavBar login={loginStatus} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={<SignUp loginHandler={updateLoginStatus} />}
        />
        <Route path="/detail/:id" element={<BookDetail />} />
        <Route path="/*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;

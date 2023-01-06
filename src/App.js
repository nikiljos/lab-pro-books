import { Route, Routes } from "react-router-dom";
import "./App.scss";
import BookDetail from "./components/BookDetail";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/detail/:id" element={<BookDetail/>}/>
      </Routes>
      
    </div>
  );
}

export default App;

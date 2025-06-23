import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Home";
import Users from "./components/Users";
import Animals from "./components/Animals";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="animals" element={<Animals />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

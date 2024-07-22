import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import LendMoney from "./components/LendMoney";
import BorrowMoney from "./components/BorrowMoney";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/lend" element={<LendMoney />} />
            <Route path="/borrow" element={<BorrowMoney />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

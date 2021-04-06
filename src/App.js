import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Routes from "./Routes";
import logo from "./assets/isgoodai-logo.png";
import "./App.css";

function App() {
  return (
    <div className="App container py-3">
      <Routes />
    </div>
  );
}

export default App;

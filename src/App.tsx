import React from "react";
import { Header } from "./features/header/Header";
import Sidebar from "./features/sidebar/Sidebar";
import Board from "./features/board/Board";
import "./App.css";

function App() {
  return (
    <div className="App d-flex flex-column">
      <Header />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <Board />
      </div>
    </div>
  );
}

export default App;

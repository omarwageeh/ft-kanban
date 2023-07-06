import React, { useState } from "react";
import { Header } from "./features/header/Header";
import Sidebar from "./features/sidebar/Sidebar";
import Board from "./features/board/Board";
import "./App.css";

function App() {
  const [shown, setShown] = useState<boolean | null>(true);
  return (
    <div className="App d-flex flex-column">
      <Header />
      <div className="d-flex flex-grow-1 main-body">
        <Sidebar setShown={setShown} />
        <Board shown={shown} />
      </div>
    </div>
  );
}

export default App;

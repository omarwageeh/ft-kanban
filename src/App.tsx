import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Header } from "./features/header/Header";
import Sidebar from "./features/sidebar/Sidebar";
import Board from "./features/board/Board";
import "./App.css";
import { useViewPort } from "./app/hooks";

function App() {
  const [shown, setShown] = useState<boolean | null>(true);
  const [theme, setTheme] = useState<boolean>(false);
  const ref: any = useRef(null);
  const { width } = useViewPort();
  useEffect(() => {
    if (theme) {
      (ref.current as HTMLElement).classList.add("dark-theme");
      (ref.current as HTMLElement).classList.remove("light-theme");
    } else {
      (ref.current as HTMLElement).classList.add("light-theme");
      (ref.current as HTMLElement).classList.remove("dark-theme");
    }
  }, [theme]);

  return (
    <div className="App d-flex flex-column" ref={ref}>
      <Header />
      <div className="d-flex flex-grow-1 main-body">
        {width >= 768 ? (
          <Sidebar setShown={setShown} theme={theme} setTheme={setTheme} />
        ) : (
          ""
        )}
        <Board shown={shown} />
      </div>
    </div>
  );
}

export default App;

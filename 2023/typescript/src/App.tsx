import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { unfoldDoc } from "./days/day12/part2.mts";
import { input } from "./Input.ts";
import { count, parseInput } from "./days/day12/common.mjs";

function App() {
  const [counter, setCounter] = useState(0);

  console.log("App render");

  const onClick = () => {
    console.log("Click!");
    const docs = parseInput(input).map(unfoldDoc);

    const doc = docs[counter];
    const start = new Date().getTime();
    console.log(doc);
    count(doc.pattern, doc.groups);

    const end = new Date().getTime();
    console.log("Took " + (end - start) + " ms.");
    setCounter((s) => s + 1);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={onClick}>count is {counter}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

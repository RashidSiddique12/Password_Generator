import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const passwordRef = useRef();

  const generatePasword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "123456789";
    if (charAllowed) str += "~`{}[]()|';:,$%^&*!@#";

    for (let i = 1; i <= length; i++) {
      let indx = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(indx);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePasword();
  }, [length, numberAllowed, charAllowed, generatePasword]);

  const copyClipBoard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 101)
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="bg-black h-screen py-14">
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-5 py-5  bg-gray-800 text-orange-500">
        <h2 className="text-white text-center text-2xl my-3">
          Password Generator
        </h2>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            className="outline-none w-full py-1 px-3 h-10"
            type="text"
            value={password}
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyClipBoard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-lg gap-x-4">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={5}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer"
            />
            <label>length({length})</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              value={numberAllowed}
              onClick={() => setNumberAllowed((prev) => !prev)}
            />
            <label>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              value={charAllowed}
              onClick={() => setCharAllowed((prev) => !prev)}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

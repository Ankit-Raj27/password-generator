import { useCallback, useEffect, useRef, useState } from "react";
// import "./App.css";
function App() {
  const [length, setLength] = useState(8);
  const [numberYes, setNumberYes] = useState(false);
  const [charYes, setCharYes] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberYes) str += "0123456789";
    if (charYes) str += "[]{}()!@#$%^&*><,.?/;:|`~";
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length - 1);
      pass = pass + str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberYes, charYes, setPassword]);

  const passwordRef = useRef(null);

  const copyToClip = useCallback(() => {
    passwordRef.current?.setSelectionRange(0, passwordRef.current);
    window.navigator.clipboard.writeText(password);
  }, [password]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numberYes, charYes, passwordGenerator]);

  return (
    <div>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-4xl text-center text-white pb-4">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3"
            placeholder="password"
            readOnly
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyToClip}
          >
            COPY
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1"></div>
          <input
            type="range"
            min={6}
            max={30}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length : {length}</label>
          <div className="flex items-center gap-x-1"></div>
          <input
            type="checkbox"
            defaultChecked={numberYes}
            id="numberInput"
            onChange={() => {
              setNumberYes((prev) => !prev);
            }}
          />
          <label>Number</label>
          <div className="flex items-center gap-x-1"></div>
          <input
            type="checkbox"
            defaultChecked={charYes}
            id="charInput"
            onChange={() => {
              setCharYes((prev) => !prev);
            }}
          />
          <label>Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;

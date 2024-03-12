import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);

  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  let passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "@#$&(){}[]";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numberAllowed, passwordGenerator]);

  return (
    <>
      <div className=" w-full max-w-md mx-auto rounded-lg shadow-md px-4 py-3 my-8 bg-gray-800 ">
        <h1 className="text-white text-center my-3">Password  Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            placeholder="password"
            className="w-full py-1 px-3 outline-none text-gray-600 bg-white"
            ref={passwordRef}
            readOnly
          />
          <button
            className="px-3 py-0.5 shrink-0 outline-none bg-blue-500 text-white"
            onClick={copyPassToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="gap-x-2 flex text-sm ">
          <div className="gap-x-1 flex items-center  ">
            <input
              type="range"
              min={6}
              max={40}
              value={length}
              onChange={(e) => {
                setlength(e.target.value);
              }}
              className="cursor-pointer"
            />
            <label>Length:{length}</label>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">characters</label>

            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setnumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numverInput">numbers</label>
          </div>
        </div>
      </div>

      <div className="flex justify-center max-w-md mx-auto ">Made by Raunak</div>
    </>
  );
}

export default App;

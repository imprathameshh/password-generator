import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  //ALL THE VARIABLES
  let [length, setLength] = useState(8);
  let [numberAllowed, setNumberAllowed] = useState(false);
  let [charAllowed, setCharAllowed] = useState(false);
  let [password, setPassword] = useState("");

  // useRef Hook
  const passwordRef = useRef(null);

  //PASSWORD GENERATOR FUNCTION
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPLKJHGFDSAZXCVBNMmnbvcxzlkjhgfdsaqwertyuiop";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "`~!@#$%^&*()_=~+-";

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      //charAt - which index you want a char
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  //COPY PASSWORD
  const copyPassword = useCallback(() => {
    //HIGHILIGHT A COPY STRING
    passwordRef.current?.select();
    //HIGHILIGHT A COPY STRING WITH A RANGE
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="w-full max-w-lg mx-auto shadow-md rounded-lg bg-orange-500 text-white px-10 py-5 my-8">
      {/* TITLE START  */}
      <h1 className="text-4xl font-bold text-center mb-5">
        Password Generator
      </h1>
      {/* TITLE END  */}
      {/* PASSWORD INPUT START  */}
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          placeholder="Passowrd"
          className="outline-none  text-black w-full py-2 px-4 "
          //REF PASS
          ref={passwordRef}
        ></input>
        <button
          onClick={copyPassword}
          className="outline-none text-white px-3 py-.5 shrink font-semibold bg-blue-500	"
        >
          Copy
        </button>
      </div>
      {/* PASSWORD INPUT END  */}
      {/* RANGE START  */}
      <div className="flex text-lg gap-x-1 mb-2">
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          className="cursor-pointer "
          onChange={(e) => setLength(e.target.value)}
        ></input>
        <lable>Length {length}</lable>
      </div>
      {/* RANGE END  */}
      {/* NUMBER INPUT START */}
      <div className="flex place-items-center text-lg  	mb-2">
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          className="w-4 h-4 border-0 "
          onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}
        />
        <label htmlFor="" className="ml-1">
          Number
        </label>
      </div>
      {/* NUMBER INPUT END */}
      {/* CHAR INPUT START */}
      <div className=" flex place-items-center text-lg mb-2">
        <input
          type="checkbox"
          defaultChecked={charAllowed}
          id="numberInput"
          className=" border-none w-4 h-4 "
          onChange={() => {
            setCharAllowed((prev) => !prev);
          }}
        />
        <label htmlFor="" className="ml-1">
          Characters
        </label>
      </div>
      {/* CHAR INPUT END */}
    </div>
  );
}

export default App;

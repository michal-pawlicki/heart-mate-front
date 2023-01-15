import React from "react";
import { useState, useEffect, useMemo } from "react";
import { useSocket } from "../service/socket";
import HeartRateChart from "../components/HeartRateChart";

const Session = () => {
  const [data, setData] = useState([]);

  const [working, setWorking] = useState(false);

  const [name, setName] = useState("Change Name");

  const socket = useSocket();

  const mean = useMemo(
    () =>
      Math.round(
        data.slice(0, 10).reduce((accumulator, object) => {
          return accumulator + object.value;
        }, 0) / 10
      ),
    [data]
  );

  useEffect(() => {
    if (working) {
      socket.on("pulse", (val) => {
        setData((previous) => [{ value: val }, ...previous]);
        console.log(val);
      });
    } else {
      socket.off("pulse");
    }
  }, [working, socket]);

  const changeUsername = () => {
    setName(prompt("enter your name"));
  };

  const handleStart = () => {
    setWorking(true);
  };

  const handleStop = () => {
    setWorking(false);
    const date = new Date();
    fetch("192.168.1.55/add_measurement", {
      method: "POST",
      body: JSON.stringify({
        name: { name },
        date: { date },
        value: { mean },
      }),
    });
  };

  const handleReset = () => {
    setData([]);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center item-center p-10">
      <HeartRateChart data={data} />
      <div className="flex flex-col justify-center items-center ">
        <div className="flex">
          <h1 className="text-2xl">{name}</h1>
          <button
            className="w-3 h-3 fill-purple-600 mx-2"
            onClick={changeUsername}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z" />
            </svg>
          </button>
        </div>
        <div className={"text-5xl md:text-6xl"}>{mean} bpm</div>
        <div>
          <button
            onClick={handleStart}
            className="border-green-500 rounded-md px-5 py-2 m-5 border-2"
          >
            Start
          </button>
          <button
            onClick={handleStop}
            className="rounded-md px-5 py-2 m-5 border-red-500 border-2"
          >
            Stop
          </button>
          <button
            onClick={handleReset}
            className="rounded-md px-5 py-2 m-5 border-violet-500 border-2"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Session;

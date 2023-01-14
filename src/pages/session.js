import React from "react";
import { useState, useEffect, useMemo } from "react";
import Chart from "../components/Chart";
import io from "socket.io-client";
import { useSocket } from "../service/socket";

const Session = () => {
  const [data, setData] = useState([
    { value: 110 },
    { value: 120 },
    { value: 130 },
    { value: 100 },
    { value: 150 },
    { value: 190 },
    { value: 90 },
  ]);

  const [working, setWorking] = useState(false);

  // const [name, setName] = useState(promps("Enter your name"));

  const handleReset = () => {
    setData([]);
  };

  const mean = useMemo(
    () =>
      Math.round(
        data.slice(0, 10).reduce((accumulator, object) => {
          return accumulator + object.value;
        }, 0) / 10
      ),
    [data]
  );

  const socket = useSocket();

  useEffect(() => {
    if (working) {
      // socket.on("updateSensorData", function (msg) {
      //   setData((previous) => [...previous, { value: msg.value }]);
      // });
      socket.on("pulse", (val) => {
        setData((previous) => [{ value: val }, ...previous]);
        console.log(val);
      });
      // count += 1;
    } else {
      socket.off("pulse");
    }
  }, [working]);

  const handleStart = () => {
    setWorking(true);
  };

  const handleStop = () => {
    setWorking(false);
    // const sum = data.reduce((accumulator, object) => {
    //   return accumulator + object.salary;
    // }, 0);
    // fetch("192.168.1.55/add_measurement", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     name: { name },
    //     date: "19-01-2023",
    //     value: {},
    //   }),
    // });
  };

  const color = useMemo(() => {
    if (mean < 120) return "rgba()";
  }, [mean]);

  return (
    <div className="flex flex-col lg:flex-row justify-center item-center p-10">
      <Chart data={data} />
      <div className="flex flex-col justify-center items-center ">
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

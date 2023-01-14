import React from "react";
import { useRef, useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from "recharts";
import io from "socket.io-client";

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

  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const height = windowSize.current[1];
  const width = windowSize.current[0];

  const handleReset = () => {
    setData([]);
  };

  useEffect(() => {
    const socket = io.connect("ws://192.168.1.55");
    if (working) {
      socket.on("updateSensorData", function (msg) {
        setData((previous) => [...previous, { text: msg.value }]);
      });
    }
    socket.disconnect();
  });

  const handleStart = () => {
    setWorking(true);
  };

  const handleStop = () => {
    setWorking(false);
  };

  return (
    <div className="flex justify-center p-10">
      <LineChart
        width={width / 2}
        height={height / 2}
        data={data}
        margin={{ top: 10, right: 15, bottom: 10, left: 15 }}
      >
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis>
          <Label
            value="Second Of Measurement"
            offset={-10}
            position="insideBottom"
          />
        </XAxis>
        <YAxis>
          <Label value="Pulse" offset={-15} position="insideLeft" />
        </YAxis>
        <Tooltip />
      </LineChart>

      <div className=" flex-row   my-auto">
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
  );
};

export default Session;

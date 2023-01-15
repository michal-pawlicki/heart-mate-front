import React from "react";
import { useState, useEffect, useMemo } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="border-2 rounded-md bg-purple-100 p-2 border-purple-600">
        <p className="text-purple-600">{`${payload[0].value} BPM`}</p>
      </div>
    );
  }

  return null;
};

const HistoryChart = (props) => {
  const [[height, width], setSize] = useState([
    window.innerHeight,
    window.innerWidth,
  ]);

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      setSize([e.target.innerHeight, e.target.innerWidth]);
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  const [calcWidth, calcHeight] = useMemo(() => {
    if (window.innerWidth > 1024) {
      return [width / 2, height / 2];
    }

    return [width * 0.9, height / 2];
  }, [width, height]);

  return (
    <LineChart
      width={calcWidth}
      height={calcHeight}
      data={props.data}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
    >
      {props.users.map((user) => (
        <Line
          type="monotone"
          dataKey={user}
          stroke={"#" + Math.floor(Math.random() * 16777215).toString(16)}
        />
      ))}

      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="date" />

      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default HistoryChart;

import React from "react";
import { useState, useEffect, useMemo } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from "recharts";

const Tick = () => {
  return <div />;
};

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

const HeartRateChart = (props) => {
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
      data={props.data.slice(0, 21)}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
    >
      <Line
        type="monotone"
        dataKey="value"
        stroke="#9333ea"
        isAnimationActive={false}
      />
      <CartesianGrid stroke="#ccc" />
      <XAxis domain={[0, 10]} reversed={true} tick={Tick} />

      <YAxis domain={[30, 300]} tickCount={10}></YAxis>
      <Tooltip content={<CustomTooltip />} />
    </LineChart>
  );
};

export default HeartRateChart;

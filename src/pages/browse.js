import React from "react";
import { useRef } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  Legend,
} from "recharts";

const Browse = () => {
  const data = [
    { date: 2010, Jake: 10, Mike: 11 },
    { date: 2011, Jake: 20, Mike: 14 },
    { date: 2012, Jake: 15, Mike: 17 },
    { date: 2013, Jake: 25, Mike: 13 },
    { date: 2014, Jake: 22, Mike: 18 },
    { date: 2015, Jake: 30, Mike: 15 },
    { date: 2016, Jake: 28, Mike: 20 },
  ];
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const height = windowSize.current[1];
  const width = windowSize.current[0];
  return (
    <div className="flex justify-center p-10">
      <LineChart width={width / 2} height={height / 2} data={data}>
        <Line type="monotone" dataKey="Jake" stroke="#8884d8" />
        <Line type="monotone" dataKey="Mike" stroke="#82ca9d" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date">
          <Label value="Date" offset={-5} position="insideBottom" />
        </XAxis>
        <YAxis>
          <Label value="Pulse" offset={-5} position="insideLeft" />
        </YAxis>
        <Tooltip />
        <Legend height={36} verticalAlign={"top"} />
      </LineChart>
    </div>
  );
};

export default Browse;

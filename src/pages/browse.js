import React from "react";
import { useRef, useEffect, useState } from "react";
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
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.55/measurements", {
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const height = windowSize.current[1];
  const width = windowSize.current[0];
  return (
    <div className="flex justify-center p-10">
      <LineChart width={width / 2} height={height / 2} data={posts}>
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

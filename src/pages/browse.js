import React from "react";
import { useState } from "react";
import HistoryChart from "../components/HistoryChart";

const Browse = () => {
  const [posts, setPosts] = useState({
    users: ["Jim", "Mike"],
    data: [
      { date: 2010, Jim: 20, Mike: 10 },
      { date: 2011, Jim: 10, Mike: 20 },
      { date: 2012, Jim: 11, Mike: 12 },
    ],
  });

  // useEffect(() => {
  //   fetch("http://192.168.1.55/measurements")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setPosts(data);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);

  const [checked, setChecked] = useState([]);

  const handleChange = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center item-center p-10">
      <HistoryChart data={posts.data} users={checked} />
      <div className="flex flex-col justify-center item-center p-5">
        {posts.users.map((user, index) => (
          <div key={index}>
            <input
              value={user}
              type="checkbox"
              onChange={handleChange}
              className="mr-2"
            />
            <span>{user}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;

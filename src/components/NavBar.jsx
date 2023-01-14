import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 h-20 py-3 bg-slate-100 w-full rounded-lg pr-32 pl-16">
      <div className="grid grid-cols-2 content-center h-full">
        {" "}
        <h1 className="text-4xl">Heart Mate</h1>{" "}
        <div className="grid grid-flow-col justify-self-end self-center gap-5">
          <Link to="/">Home</Link>
          <Link to="/browse">Browse</Link>
          <Link to="/session">New Session</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

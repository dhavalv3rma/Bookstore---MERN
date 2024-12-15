import React from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="bg-sky-500 text-white px-4 py-2 rounded-lg w-fit justify-center"
      >
        <BsArrowLeft className="text-2xl m-auto" />
      </Link>
    </div>
  );
};

export default BackButton;

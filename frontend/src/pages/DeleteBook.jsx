import React, { useState } from "react";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteBook = () => {
    setLoading(true);

    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <BackButton />

      {loading ? <Spinner /> : ""}
      <div className=" border border-gray-500 m-10 p-5 text-center">
        <h1>Are you sure you want to delete this book from DB? </h1>
        <div className="flex flex-col justify-center">
          <button
            className="bg-red-400 text-white m-8 p-4"
            onClick={handleDeleteBook}
          >
            Delete it
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;

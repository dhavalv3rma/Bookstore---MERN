import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setbook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`).then((response) => {
      setbook(response.data);
      setLoading(false);
    });
  }, []);
  return (
    <div className="p-4">
      <div className="flex">
        <span className="my-auto mr-5">
          <BackButton />
        </span>
        <h1 className="text-3xl my-4"> Show Book</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;

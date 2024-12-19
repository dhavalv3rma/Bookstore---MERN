import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import environment from "../../environment";

const ShowBook = () => {
  const [book, setbook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams(false);

  useEffect(() => {
    setLoading(true);
    axios.get(environment.apiBase+id).then((response) => {
      setbook(response.data);
      setLoading(false);
    });
  }, []);
  
  return (
    <div className="p-4 m-auto">
      <div className="flex">
        <span className="my-auto mr-5">
          <BackButton />
        </span>
        <h1 className="text-3xl my-4"> Show Book</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-gray-500 rounded-xl  m-auto p-4 w-[100%] sm:w-[80%] md:w-[60%]">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title:</span>
            <span className="font-semibold text-2xl">{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author:</span>
            <span className="font-semibold text-2xl">{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year:</span>
            <span className="font-semibold text-2xl">{book.publishYear}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;

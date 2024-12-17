import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [bookId, setBookId] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`).then((response) => {
      setBookId(response.data._id);
      setTitle(response.data.title);
      setAuthor(response.data.author);
      setPublishYear(response.data.publishYear);
      setLoading(false);
    });
  }, []);

  const handleEditBook = () => {
    const data = {
      title: title,
      author: author,
      publishYear: publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("An error happened. Please console check.");
      });
  };

  return (
    <div className="p-4 m-auto">
      <div className="flex">
        <span className="my-auto mr-5">
          <BackButton />
        </span>
        <h1 className="text-3xl my-4"> Edit Book</h1>
      </div>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-gray-500 rounded-xl w-1/2 p-4 m-auto">
        <div className="my-4">
          <label htmlFor="">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-lg"
          />
        </div>
        <div className="my-4">
          <label htmlFor="">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-lg"
          />
        </div>
        <div className="my-4">
          <label htmlFor="">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-lg"
          />
        </div>

        <button
          onClick={handleEditBook}
          className="bg-blue-400 text-white p-4 py-1"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;

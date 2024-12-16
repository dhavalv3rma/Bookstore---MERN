import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [count, setCount] = useState("");
  const [view, setView] = useState("table");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setCount(response.data.count);
        setLoading(false);
      })
      .catch((error) => {
        console.log("ERROR : " + error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 m-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List - ({count} found) </h1>
        <div>
          <button
            className={
              "border m-1 p-2 " +
              (view === "table" ? "bg-green-400 text-white" : "bg-slate-400")
            }
            onClick={() => setView("table")}
          >
            Table
          </button>
          <button
            className={
              "border m-1 p-2 " +
              (view === "card" ? "bg-green-400 text-white" : "bg-slate-400")
            }
            onClick={() => setView("card")}
          >
            Card
          </button>
        </div>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div>
          {view === "table" ? (
            <table className="w-full border-seperate border-spacing-2 ">
              <thead>
                <tr>
                  <th className="border border-gray-500 rounded-md">No</th>
                  <th className="border border-gray-500 rounded-md">Title</th>
                  <th className="border border-gray-500 rounded-md max-md:hidden">
                    Author
                  </th>
                  <th className="border border-gray-500 rounded-md max-md:hidden">
                    Publish Year
                  </th>
                  <th className="border border-gray-500 rounded-md">
                    Operations
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={book._id} className="h-8">
                    <td className="border border-gray-500 rounded-md text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-500 rounded-md text-center">
                      {book.title}
                    </td>
                    <td className="border border-gray-500 rounded-md max-md:hidden text-center">
                      {book.author}
                    </td>
                    <td className="border border-gray-500 rounded-md max-md:hidden text-center">
                      {book.publishYear}
                    </td>
                    <td className="border border-gray-500 rounded-md text-center">
                      <div className="flex justify-center gap-x-4">
                        <Link to={`/books/details/${book._id}`}>
                          <BsInfoCircle className=" text-2xl text-green-800" />
                        </Link>
                        <Link to={`/books/edit/${book._id}`}>
                          <AiOutlineEdit className=" text-2xl text-yellow-600" />
                        </Link>
                        <Link to={`/books/delete/${book._id}`}>
                          <MdOutlineDelete className=" text-2xl text-red-600" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-row">
              {books.map((book, index) => (
                <div
                  key={index}
                  className="card  m-3 p-6 border-2 border-gray-200 bg-yellow-200 w-[260px] rounded-lg"
                >
                  <span className="font-bold text-2xl ">{book.title} </span>
                  <span className="text-xs">({book.publishYear})</span>
                  <p className="mt-3">By: {book.author}</p>
                  <div className="flex justify-around mt-8 p-3 bg-yellow-100 rounded-lg">
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle className=" text-2xl text-green-800" />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className=" text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className=" text-2xl text-red-600" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;

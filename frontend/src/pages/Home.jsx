import React, { useEffect, useState } from "react";
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
  const [viewBtn, setViewBtn] = useState(false);

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
        <div className="flex justify-center align-middle">
 
          <button
            className={
              "border border-slate-500 m-1 px-4 rounded-lg " +
              (view === "table" ? "bg-green-400 text-white" : "bg-slate-400")
            }
            onClick={() => setView("table")}
          >
            Table View
          </button>

          <button
            className={
              "border border-slate-500 m-1 px-4 rounded-lg " +
              (view === "card" ? "bg-green-400 text-white" : "bg-slate-400")
            }
            onClick={() => setView("card")}
          >
            Card View
          </button>
          <Link className="my-auto mx-3 " to="/books/create">
            <MdOutlineAddBox className="text-sky-400 text-4xl" />
          </Link>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div>
          {view === "table" ? (
            <table className="w-full border-seperate border-spacing-2 ">
              <thead>
                <tr>
                  <th className="border p-2 bg-gray-600 border-gray-500 ">No</th>
                  <th className="border p-2 bg-gray-600 border-gray-500 ">Title</th>
                  <th className="border p-2 bg-gray-600 border-gray-500  max-md:hidden">
                    Author
                  </th>
                  <th className="border p-2 bg-gray-600 border-gray-500  max-md:hidden">
                    Publish Year
                  </th>
                  <th className="border p-2 bg-gray-600 border-gray-500 ">
                    Operations
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={book._id} className="h-8">
                    <td className="border border-gray-500 p-2 rounded-md text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-500 p-2 rounded-md text-center">
                      {book.title}
                    </td>
                    <td className="border border-gray-500 p-2 rounded-md max-md:hidden text-center">
                      {book.author}
                    </td>
                    <td className="border border-gray-500 p-2 rounded-md max-md:hidden text-center">
                      {book.publishYear}
                    </td>
                    <td className="border border-gray-500 p-2 rounded-md text-center">
                      <div className="flex justify-center gap-x-4">
                        <Link className="bg-gray-600 rounded-lg p-2" to={`/books/details/${book._id}`}>
                          <BsInfoCircle className=" text-2xl text-green-500" />
                        </Link>
                        <Link className="bg-gray-600 rounded-lg p-2" to={`/books/edit/${book._id}`}>
                          <AiOutlineEdit className=" text-2xl text-yellow-500" />
                        </Link>
                        <Link className="bg-gray-600 rounded-lg p-2" to={`/books/delete/${book._id}`}>
                          <MdOutlineDelete className=" text-2xl text-red-500" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-row justify-center">
              {books.map((book, index) => (
                <div
                  key={index}
                  className="card  m-3  p-6 border-2 border-gray-200 bg-yellow-200 text-slate-950 w-[260px] rounded-lg"
                >
                  <span className="font-bold text-2xl ">{book.title} </span>
                  <span className="text-xs">({book.publishYear})</span>
                  <p className="mt-3">By: {book.author}</p>
                  <div className="flex justify-around mt-8 p-3 rounded-lg bg-yellow-100">
                    <Link to={`/books/details/${book._id}`} className="p-3 hover:bg-white rounded-lg  ">
                      <BsInfoCircle className=" text-2xl text-green-400" />
                    </Link>
                    <Link to={`/books/edit/${book._id}`} className="p-3 hover:bg-white rounded-lg  ">
                      <AiOutlineEdit className=" text-2xl text-yellow-400" />
                    </Link>
                    <Link to={`/books/delete/${book._id}`} className="p-3 hover:bg-white rounded-lg  ">
                      <MdOutlineDelete className=" text-2xl text-red-400" />
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/BooksData.css";
import BooksRendered from "./BooksRendered";
import { Link } from "react-router-dom";


export const AuthContext = React.createContext();
function BooksData() {
  const [bookData, setBookData] = useState([]); // Declare a state variable called bookData and initialize it as an empty array
  const [searchItem, setSearchItem] = useState(""); // Declare a state variable called searchItem and initialize it as an empty string
  const [searchQuery, setSearchQuery] = useState(""); // Declare a state variable called searchQuery and initialize it as an empty string

  useEffect(() => {
    axios // Make an API call to the specified URL using axios
      .get("https://reactnd-books-api.udacity.com/books", {
        headers: { Authorization: "whatever-you-want" }, // Set a header for Authorization
      })
      .then((res) => {
        setBookData(res.data.books); // Store the fetched data using the SetBookData function
      })
      .catch(() => alert("Network Error"));
  }, []);

  const handleSearch = (e) => {
    const inputValue = e.target.value; // Store the input of the user
    setSearchItem(inputValue);
    if (inputValue !== "") {
      // check if the input value is not empty
      const relatedBooks = bookData.filter((book) =>
        book.title.toLowerCase().includes(inputValue.toLowerCase())
      ); // filter the books which the user entered
      setSearchItem(relatedBooks); // store the segregated books
      setSearchQuery(inputValue); // store the input value for the search results
    }
  };

  const newBooks = searchItem.length > 0 ? searchItem : bookData;
  return (
    <>
      <div id="nav">
        <div>
          <div>
            {" "}
            <img src="https://kalvium.com/wp-content/uploads/2022/07/Logo-nav.png"></img>{" "}
            {/*Kalvium Logo*/}
          </div>
          <div>
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Search Kalvium books"
            ></input>{" "}
            {/*Search Bar to search the books*/}
          </div>
        </div>
        <div>
          {
            <Link to="/register">
              {" "}
              <button>Register</button>{" "}
              {/*Link the register button to move to the registration component*/}
            </Link>
          }
        </div>
      </div>
      {searchItem.length > 0 ? (
        <p id="possible-results">
          Showing the results for <em id="results-title">{searchQuery}</em>
        </p>
      ) : null}{" "}
      {/* conditionally show the search results based on the length of the searches*/}
      <BooksRendered bookData={newBooks} />{" "}
      {/*Pass the newBooks data as a props*/}
    </>
  );
}

export default BooksData;

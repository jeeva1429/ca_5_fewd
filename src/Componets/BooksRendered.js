import React from "react";

function BooksRendered({ bookData }) {
  // use the props passed from the booksData.js
  return (
    <>
      <div id="main">
        {bookData?.map((book) => (
          <div key={book.id} className="book-container">
            <div id="images">
              <img
                className="book-img"
                key={book.id}
                src={book.imageLinks.thumbnail}
                alt={`${book.title} image`}
              />
            </div>
            <div id="title-div">
              <p id="title" class="tooltip">
                {book.title && book.title.slice(0, 25) === book.title ? ( // check whether the title of the book is less than or equal to 25 chars
                  <span>{book.title}</span> // If yes, render that
                ) : (
                  <span>{`${book.title.slice(0, 20)}...`}</span> // If no, render only first 20 chars and followed by ...
                )}
                <span class="tooltiptext">{book.title}</span>{" "}
                {/*This is to show the title when it is hovered by the user */}
              </p>
            </div>
            <div id="rating-price">
              {book.averageRating ? ( //If rating is in the data,
                <p>{book.averageRating}⭐</p> // render that rating
              ) : (
                <p id="unrated">UR</p> // render as 'UR -Unrated'
              )}
              <p>Free</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default BooksRendered;

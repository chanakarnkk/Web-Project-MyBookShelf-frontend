import { useState } from "react";
import axios from "axios";

export default function BooksPage() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    if (!query) return;

    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      const data = await response.json();
      setBooks(data.items || []);
      
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">Search Google Books</h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search for books..."
          className="w-full max-w-md px-4 py-2 border rounded-l-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={searchBooks}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book: any) => {
          const info = book.volumeInfo;
          return (
            <div
              key={book.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
            >
              <img
                src={info.imageLinks?.thumbnail || "/no-image.png"}
                alt={info.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="font-semibold text-lg mb-2">{info.title}</h2>
              <p className="text-sm text-gray-600 mb-2">
                {info.authors?.join(", ") || "Unknown Author"}
              </p>
              <button className="mt-auto bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700">
                Add to Shelf
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";

type Book = {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
};

export default function MyBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("/api/my-books"); // สร้าง backend endpoint ภายหลัง
        setBooks(res.data);
      } catch (err) {
        console.error("Failed to fetch books", err);
      }
    };

    fetchBooks();
  }, []);

  const handleRemove = async (id: string) => {
    try {
      await axios.delete(`/api/my-books/${id}`);
      setBooks(prev => prev.filter(book => book.id !== id));
    } catch (err) {
      console.error("Failed to remove book", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 My Bookshelf</h1>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">ยังไม่มีหนังสือในชั้นของคุณเลย 🥲</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <img
                src={book.thumbnail}
                alt={book.title}
                className="w-full h-48 object-cover mb-3 rounded"
              />
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-600 mb-2">
                {book.authors?.join(", ") || "Unknown author"}
              </p>
              <div className="flex justify-between">
                <a
                  href={`https://books.google.com?q=${book.title}`}
                  target="_blank"
                  className="text-blue-600 text-sm hover:underline"
                >
                  ดูรายละเอียด
                </a>
                <button
                  onClick={() => handleRemove(book.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  ลบออก
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

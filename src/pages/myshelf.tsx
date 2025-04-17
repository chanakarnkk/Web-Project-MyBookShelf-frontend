import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

type Book = {
  id: string;
  title: string;
  authors?: string[];
  thumbnail?: string;
};

export default function MyShelfPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchMyShelf = async () => {
    try {
      const res = await axios.get("/api/shelf");
      setBooks(res.data); // สมมติ backend ส่ง array ของ Book
    } catch (err) {
      console.error("Unauthorized or failed:", err);
      router.push("/login"); // ถ้ายังไม่ได้ login
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyShelf();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading your shelf...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">📚 My Book Shelf</h1>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col">
              <img
                src={book.thumbnail || "/no-image.png"}
                alt={book.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="font-semibold text-lg mb-2">{book.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{book.authors?.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

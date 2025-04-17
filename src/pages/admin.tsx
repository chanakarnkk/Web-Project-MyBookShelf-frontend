import { useEffect, useState } from "react";
import axios from "axios";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  shelfCount: number;
};

export default function AdminPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/admin/users"); // <- ภายหลังค่อยทำ API นี้
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">👑 Admin Dashboard</h1>

      <table className="w-full border border-gray-300 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border text-left">Name</th>
            <th className="p-2 border text-left">Email</th>
            <th className="p-2 border">Books in Shelf</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-4 text-gray-500">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user.id}>
                <td className="p-2 border text-center">{index + 1}</td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border text-center">{user.shelfCount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

import { useEffect, useState } from "react";

type User = {
  userId: number;
  userName: string;
  email: string;
  contactPhone: string;
  userType: string;
};

const roleOptions = ["admin", "owner", "driver", "customer", "member"];

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data: User[] = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete a user by ID
  const handleDelete = async (userId: number) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers((prev) => prev.filter((user) => user.userId !== userId));
    } catch (err: any) {
      setError(err.message || "Delete failed");
    }
  };

  // Update user role
  const handleRoleChange = async (userId: number, newRole: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${userId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userType: newRole }),
      });

      if (!res.ok) throw new Error("Failed to update role");

      const updatedUser: User = await res.json();
      setUsers((prev) =>
        prev.map((user) =>
          user.userId === userId ? { ...user, userType: updatedUser.userType } : user
        )
      );
    } catch (err: any) {
      alert(err.message || "Role update failed");
    }
  };

  return (
    <div className="p-4 bg-black min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-yellow-400">All Users</h2>

      {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}
      {loading ? (
        <p className="text-yellow-400">Loading users...</p>
      ) : (
        <table className="min-w-full rounded-lg border border-blue-600">
          <thead>
            <tr className="bg-purple-900 text-yellow-300 uppercase tracking-wide">
              <th className="p-3 text-left border-r border-blue-600">ID</th>
              <th className="p-3 text-left border-r border-blue-600">Name</th>
              <th className="p-3 text-left border-r border-blue-600">Email</th>
              <th className="p-3 text-left border-r border-blue-600">Phone</th>
              <th className="p-3 text-left border-r border-blue-600">Role</th>
              <th className="p-3 text-left border-r border-blue-600">Change Role</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.userId}
                className="border-t border-blue-700 hover:bg-blue-900 transition-colors"
              >
                <td className="p-3 border-r border-blue-700 text-yellow-300 font-semibold">
                  {user.userId}
                </td>
                <td className="p-3 border-r border-blue-700 text-yellow-400">{user.userName}</td>
                <td className="p-3 border-r border-blue-700 text-yellow-400">{user.email}</td>
                <td className="p-3 border-r border-blue-700 text-yellow-400">
                  {user.contactPhone}
                </td>
                <td className="p-3 border-r border-blue-700 text-green-400 capitalize font-semibold">
                  {user.userType}
                </td>
                <td className="p-3 border-r border-blue-700">
                  <select
                    value={user.userType}
                    onChange={(e) => handleRoleChange(user.userId, e.target.value)}
                    className="bg-gray-800 text-white px-2 py-1 rounded"
                  >
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(user.userId)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={7} className="p-4 text-center text-yellow-300">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

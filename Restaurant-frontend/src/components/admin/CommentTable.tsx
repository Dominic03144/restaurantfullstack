// src/components/CommentTable.tsx
import React, { useEffect, useState } from "react";

type Comment = {
  commentId: number;
  userName: string;
  commentText: string;
  type: string; // e.g., "praise", "complaint"
};

export default function CommentTable() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch all comments from backend
  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/comments");
      if (!response.ok) throw new Error("Failed to fetch comments");
      const data: Comment[] = await response.json();
      setComments(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // Delete comment by ID
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/api/comments/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete comment");

      setComments((prev) => prev.filter((comment) => comment.commentId !== id));
    } catch (err: any) {
      setError(err.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="p-4 bg-black min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-yellow-400">Comments</h2>

      {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}
      {loading && <p className="text-blue-300 mb-4">Loading comments...</p>}

      <table className="w-full rounded-lg border border-blue-600">
        <thead className="bg-purple-900 text-yellow-300 text-left uppercase tracking-wide">
          <tr>
            <th className="p-3 border-r border-blue-600">User</th>
            <th className="p-3 border-r border-blue-600">Comment</th>
            <th className="p-3 border-r border-blue-600">Type</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr
              key={comment.commentId}
              className="border-t border-blue-700 hover:bg-blue-900 transition-colors"
            >
              <td className="p-3 border-r border-blue-700 text-yellow-400 font-semibold">
                {comment.userName}
              </td>
              <td className="p-3 border-r border-blue-700 text-yellow-400">
                {comment.commentText}
              </td>
              <td className="p-3 border-r border-blue-700 text-green-400 font-semibold capitalize">
                {comment.type}
              </td>
              <td className="p-3">
                <button
                  onClick={() => handleDelete(comment.commentId)}
                  className="text-red-400 hover:text-red-600 font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {!loading && comments.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-center text-yellow-300">
                No comments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

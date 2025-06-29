import { useEffect, useState } from "react";

type Restaurant = {
  restaurantId: number;
  restaurantName: string;
  streetAddress: string;
  zipCode: string;
  cityId: number;
};

export default function RestaurantTable() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchRestaurants = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/api/restaurants");
      if (!res.ok) throw new Error("Failed to fetch restaurants");
      const data = await res.json();
      setRestaurants(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this restaurant?");
    if (!confirmDelete) return;

    setDeletingId(id);
    setError(null);

    try {
      const res = await fetch(`http://localhost:3000/api/restaurants/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete restaurant");

      setRestaurants((prev) => prev.filter((r) => r.restaurantId !== id));
    } catch (err: any) {
      setError(err.message || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div className="p-6 bg-black min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-yellow-400">Restaurants</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-900 text-red-400 rounded font-semibold">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-yellow-400">Loading restaurants...</p>
      ) : restaurants.length === 0 ? (
        <p className="text-yellow-400">No restaurants found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-blue-600">
          <table className="w-full table-auto text-left text-yellow-300">
            <thead className="bg-purple-900 uppercase tracking-wide text-sm">
              <tr>
                <th className="p-3 border-r border-blue-600">Name</th>
                <th className="p-3 border-r border-blue-600">Street</th>
                <th className="p-3 border-r border-blue-600">Zip Code</th>
                <th className="p-3 border-r border-blue-600">City ID</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr
                  key={restaurant.restaurantId}
                  className="border-t border-blue-700 hover:bg-blue-900 transition-colors"
                >
                  <td className="p-3 border-r border-blue-700 font-semibold text-yellow-400">
                    {restaurant.restaurantName}
                  </td>
                  <td className="p-3 border-r border-blue-700">{restaurant.streetAddress}</td>
                  <td className="p-3 border-r border-blue-700">{restaurant.zipCode}</td>
                  <td className="p-3 border-r border-blue-700">{restaurant.cityId}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(restaurant.restaurantId)}
                      disabled={deletingId === restaurant.restaurantId}
                      className={`font-semibold transition-colors ${
                        deletingId === restaurant.restaurantId
                          ? "text-gray-500 cursor-not-allowed"
                          : "text-red-400 hover:text-red-600"
                      }`}
                      aria-label={`Delete restaurant ${restaurant.restaurantName}`}
                    >
                      {deletingId === restaurant.restaurantId ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

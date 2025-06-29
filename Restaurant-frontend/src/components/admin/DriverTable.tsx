import { useEffect, useState } from "react";

type Driver = {
  driverId: number;
  driverName: string;
  carMake: string;
  carModel: string;
  carYear: number;
  online: boolean;
};

export default function DriverTable() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchDrivers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/drivers");
      if (!res.ok) throw new Error("Failed to fetch drivers");
      const data: Driver[] = await res.json();
      setDrivers(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    }
  };

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Are you sure you want to delete this driver?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3000/api/drivers/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete driver");
      setDrivers((prev) => prev.filter((d) => d.driverId !== id));
    } catch (err: any) {
      setError(err.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <div className="p-4 bg-black min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-yellow-400">Drivers</h2>

      {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

      <table className="w-full rounded-lg border border-blue-600">
        <thead className="bg-purple-900 text-yellow-300 text-left uppercase tracking-wide">
          <tr>
            <th className="p-3 border-r border-blue-600">Name</th>
            <th className="p-3 border-r border-blue-600">Car</th>
            <th className="p-3 border-r border-blue-600">Online</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.driverId} className="border-t border-blue-700 hover:bg-blue-900 transition-colors">
              <td className="p-3 border-r border-blue-700 text-yellow-400 font-semibold">{driver.driverName}</td>
              <td className="p-3 border-r border-blue-700 text-yellow-400">
                {driver.carMake} {driver.carModel} ({driver.carYear})
              </td>
              <td className="p-3 border-r border-blue-700 font-semibold">
                {driver.online ? (
                  <span className="text-green-400">Yes</span>
                ) : (
                  <span className="text-red-400">No</span>
                )}
              </td>
              <td className="p-3">
                <button
                  onClick={() => handleDelete(driver.driverId)}
                  className="text-red-400 hover:text-red-600 font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

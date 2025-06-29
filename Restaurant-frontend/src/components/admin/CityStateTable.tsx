import { useEffect, useState } from "react";

type City = {
  cityId: number;
  cityName: string;
  stateName: string; // this comes from JOIN with states table
  stateCode: string; // assuming your state table has a code field
};

export default function CityStateTable() {
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/cities");
        if (!res.ok) throw new Error("Failed to fetch cities");

        const data = await res.json();
        setCities(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      }
    };

    fetchCities();
  }, []);

  return (
    <div className="p-4 bg-black min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-yellow-400">Cities & States</h2>

      {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

      <table className="w-full rounded-lg border border-blue-600">
        <thead className="bg-purple-900 text-yellow-300 text-left uppercase tracking-wide">
          <tr>
            <th className="p-3 border-r border-blue-600">City</th>
            <th className="p-3 border-r border-blue-600">State</th>
            <th className="p-3">Code</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => (
            <tr key={city.cityId} className="border-t border-blue-700 hover:bg-blue-900 transition-colors">
              <td className="p-3 border-r border-blue-700 text-yellow-400 font-semibold">{city.cityName}</td>
              <td className="p-3 border-r border-blue-700 text-yellow-400">{city.stateName}</td>
              <td className="p-3 text-yellow-400">{city.stateCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

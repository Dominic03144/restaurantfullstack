const OrderTable = () => {
  return (
    <div className="p-4 bg-black min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-yellow-400">Orders</h2>
      <table className="w-full rounded-lg border border-blue-600">
        <thead className="bg-purple-900 text-yellow-300 text-left uppercase tracking-wide">
          <tr>
            <th className="p-3 border-r border-blue-600">Order ID</th>
            <th className="p-3 border-r border-blue-600">Customer</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-blue-700 hover:bg-blue-900 transition-colors">
            <td className="p-3 border-r border-blue-700 text-yellow-400 font-semibold">#1001</td>
            <td className="p-3 border-r border-blue-700 text-yellow-400">John Doe</td>
            <td className="p-3 text-yellow-400">Delivered</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;

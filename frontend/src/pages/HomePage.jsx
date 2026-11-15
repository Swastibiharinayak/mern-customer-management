import { useEffect, useState } from "react";
import API from "../lib/api";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      setError("");

      const response = await API.get("/");
      setCustomers(response.data.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError("Unable to load customers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?",
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
      setError("Unable to delete customer.");
    }
  };

  const handleEdit = (customer) => {
    navigate(`/edit/${customer._id}`, {
      state: { customer },
    });
  };

  if (loading) {
    return <p className="p-6">Loading customers...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Customer Management</h1>

      {customers.length === 0 ? (
        <p>No customers found. Add your first customer!</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {customers.map((customer) => (
            <div
              key={customer._id}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              {customer.image && (
                <img
                  src={customer.image}
                  alt={customer.name}
                  className="mb-4 h-20 w-20 rounded-full object-cover"
                />
              )}

              <h2 className="text-xl font-bold text-gray-800">
                {customer.name}
              </h2>

              <p className="text-gray-500">{customer.phone}</p>

              <p className="my-3 text-lg font-semibold text-green-600">
                Balance: ₹{customer.balance || 0}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(customer)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(customer._id)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

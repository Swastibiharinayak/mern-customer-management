import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import API from "../lib/api";

const CreateCustomerPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const isEditing = Boolean(id);
  const selectedCustomer = location.state?.customer;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    balance: "",
    image: "",
  });

  useEffect(() => {
    if (isEditing && selectedCustomer) {
      setFormData({
        name: selectedCustomer.name || "",
        phone: selectedCustomer.phone || "",
        balance: selectedCustomer.balance ?? "",
        image: selectedCustomer.image || "",
      });
    }
  }, [isEditing, selectedCustomer]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const customerData = {
        ...formData,
        balance: Number(formData.balance || 0),
      };

      let response;

      if (isEditing) {
        // Update existing customer
        response = await API.put(`/${id}`, customerData);
        console.log("Customer updated:", response.data);
      } else {
        // Create new customer
        response = await API.post("/", customerData);
        console.log("Customer created:", response.data);
      }

      navigate("/");
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl p-6 shadow-lg"
      >
        <h2 className="mb-6 text-2xl font-bold">
          {isEditing ? "Update Customer" : "Add Customer"}
        </h2>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Full Name *</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter customer name"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Phone Number *
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Balance</label>

          <input
            type="number"
            name="balance"
            value={formData.balance}
            onChange={handleChange}
            placeholder="Enter balance"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium">
            Customer Image URL
          </label>

          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Paste image URL"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          {isEditing ? "Update Customer" : "Add Customer"}
        </button>
      </form>
    </div>
  );
};

export default CreateCustomerPage;

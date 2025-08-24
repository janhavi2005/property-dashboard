"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";  // ✅ Dark mode toggle button

export default function Home() {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [properties, setProperties] = useState<any[]>([]);
  const [newProperty, setNewProperty] = useState({
    name: "",
    type: "",
    price: "",
    location: "",
    description: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  // ✅ Load Mock Properties
  useEffect(() => {
    const mockProperties = [
      {
        id: 1,
        name: "Luxury Villa",
        location: "Pune",
        price: "$250,000",
        description: "A spacious villa with modern amenities and a beautiful garden.",
        type: "Villa",
        image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
      },
      {
        id: 2,
        name: "Commercial Plot",
        location: "Bangalore",
        price: "$180,000",
        description: "Ideal for shops and offices in a prime location.",
        type: "Plot",
        image: "https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg",
      },
      {
        id: 3,
        name: "Residential Apartment",
        location: "Hyderabad",
        price: "$120,000",
        description: "A modern 2BHK apartment in the city center.",
        type: "Apartment",
        image: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg",
      },
    ];
    setProperties(mockProperties);
  }, []);

  // ✅ Add Property
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProperty.name || !newProperty.type || !newProperty.price) return;
    setProperties([
      ...properties,
      { ...newProperty, id: properties.length + 1, image: "https://via.placeholder.com/400" },
    ]);
    setNewProperty({ name: "", type: "", price: "", location: "", description: "" });
  };

  // ✅ Open Modal
  const openModal = (property: any) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  return (
   <div className="p-8 min-h-screen bg-white dark:bg-gray-900">
  <ThemeToggle />
  <h1 className="text-4xl font-extrabold mb-8 text-black dark:text-white">
    🏡 Mini Property Listing Dashboard
  </h1>


      {/* ✅ Search & Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by name or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 p-3 border border-gray-500 rounded-lg focus:outline-none focus:border-blue-600 text-black dark:text-white dark:bg-gray-800"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full md:w-1/4 p-3 border border-gray-500 rounded-lg focus:outline-none focus:border-blue-600 text-black dark:text-white dark:bg-gray-800"
        >
          <option value="">All Types</option>
          <option value="Villa">Villa</option>
          <option value="Plot">Plot</option>
          <option value="Apartment">Apartment</option>
        </select>
      </div>

      {/* ✅ Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {properties
          .filter(
            (property) =>
              (property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
              (filterType === "" || property.type === filterType)
          )
          .map((property) => (
            <div
              key={property.id}
              className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition"
            >
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-extrabold text-black dark:text-white mb-1">{property.name}</h2>
              <p className="text-lg font-bold text-black dark:text-gray-300">{property.location}</p>
              <p className="text-xl font-extrabold text-green-700">{property.price}</p>
              <p className="text-gray-700 dark:text-gray-400 font-medium mt-2">{property.description}</p>
              <button
                onClick={() => openModal(property)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
              >
                View Details
              </button>
            </div>
          ))}
      </div>

      {/* ✅ Add Property Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">➕ Add Property</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Property Name"
            value={newProperty.name}
            onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
            className="w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:border-blue-600 text-black dark:text-white dark:bg-gray-700 placeholder-gray-400"
          />
          <select
            value={newProperty.type}
            onChange={(e) => setNewProperty({ ...newProperty, type: e.target.value })}
            className="w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:border-blue-600 text-black dark:text-white dark:bg-gray-700"
          >
            <option value="">Select Type</option>
            <option value="Plot">Plot</option>
            <option value="Villa">Villa</option>
            <option value="Apartment">Apartment</option>
          </select>
          <input
            type="text"
            placeholder="Price"
            value={newProperty.price}
            onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
            className="w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:border-blue-600 text-black dark:text-white dark:bg-gray-700"
          />
          <input
            type="text"
            placeholder="Location"
            value={newProperty.location}
            onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
            className="w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:border-blue-600 text-black dark:text-white dark:bg-gray-700"
          />
          <textarea
            placeholder="Description"
            value={newProperty.description}
            onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
            className="w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:border-blue-600 text-black dark:text-white dark:bg-gray-700"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-bold"
          >
            Submit
          </button>
        </form>
      </div>

      {/* ✅ Modal for View Details */}
      {isModalOpen && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full relative shadow-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white text-xl font-bold"
            >
              ✖
            </button>
            <img
              src={selectedProperty.image}
              alt={selectedProperty.name}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">{selectedProperty.name}</h2>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{selectedProperty.location}</p>
            <p className="text-xl font-extrabold text-green-700">{selectedProperty.price}</p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{selectedProperty.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

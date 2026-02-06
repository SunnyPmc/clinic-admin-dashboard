import { useState, FormEvent } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CreateTestimonial() {
  const [message, setMessage] = useState<string>("");
  const [quote, setQuote] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!message || !quote || !name || !designation) {
      alert("All fields are required");
      return;
    }

    const payload = { message, quote, name, designation };

    try {
      setLoading(true);

      // const res = await fetch("http://localhost:5000/api/testimonials", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });
      const res = await fetch(`${API_BASE_URL}/api/testimonials`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

      if (!res.ok) throw new Error("Failed to create testimonial");

      alert("Testimonial created successfully 🎉");

      // Reset form
      setMessage("");
      setQuote("");
      setName("");
      setDesignation("");
    } catch (err) {
      console.error(err);
      alert("Error creating testimonial");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageMeta title="Create Testimonial | Admin Dashboard" />
      <PageBreadcrumb pageTitle="Create Testimonial" />

      <div className="max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Message */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              rows={4}
              placeholder="Enter testimonial message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Quote */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Quote
            </label>
            <input
              type="text"
              placeholder="Enter quote"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Designation */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Designation
            </label>
            <input
              type="text"
              placeholder="Enter designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#2563EB", // Tailwind blue-600
              color: "#fff",
              padding: "10px 16px",
              borderRadius: "0.5rem",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Create
          </button>

        </form>
      </div>
    </div>
  );
}

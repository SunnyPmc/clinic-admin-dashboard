


import { useState, ChangeEvent, FormEvent } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
// import { createBlog } from "../../services/blogService";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CreateBlog() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !description || !image) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    // formData.append("image", image);
    if (image) {
  formData.append("image", image); // only append if image exists
}

    try {
      setLoading(true);

      // const res = await fetch("http://localhost:5000/api/blogs", {
      //   method: "POST",
      //   body: formData, // ❗ DO NOT set Content-Type manually
      // });
      const res = await fetch(`${API_BASE_URL}/api/blogs`, {
        method: "POST",
        body: formData, 
      });
      console.log(res.formData);
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        console.error("Server returned error:", data);
        throw new Error("Failed to create blog");
      }

      alert("Blog created successfully 🎉");

      // reset form
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error(error);
      alert("Error creating blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageMeta title="Create Blog | Admin Dashboard" />
      <PageBreadcrumb pageTitle="Create Blog" />

      <div className="max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Blog Title
            </label>
            <input
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows={5}
              placeholder="Write blog description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
            />
          </div>

          {/* Image */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Blog Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            />
          </div>

          {/* Submit Button */}
         <button
  type="submit"
  disabled={loading}
  style={{
    backgroundColor: "#2563EB", // Tailwind blue-600
    color: "#fff",
    padding: "8px 16px",
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



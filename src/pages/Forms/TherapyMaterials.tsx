import { useState, ChangeEvent, FormEvent } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export default function CreateTherapyMaterial() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [link, setLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     if (!title || !description || !category || !image || !link) {
//       alert("All fields are required");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("category", category);
//     formData.append("image", image);
//     formData.append("link", link);

//     try {
//       setLoading(true);

//       // const res = await fetch("http://localhost:5000/api/materials", {
//       //   method: "POST",
//       //   body: formData,
//       // });
//       const res = await fetch(`${API_BASE_URL}/api/materials`, {
//   method: "POST",
//   body: formData,
// });


//       if (!res.ok) throw new Error("Failed to create therapy material");

//       alert("Therapy Material created successfully 🎉");

//       // Reset form
//       setTitle("");
//       setDescription("");
//       setCategory("");
//       setImage(null);
//       setLink("");
//     } catch (err) {
//       console.error(err);
//       // alert("Error creating therapy material");
      
//     } finally {
//       setLoading(false);
//     }
//   };

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  if (!title || !description || !category || !image || !link) {
    alert("All fields are required");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("image", image);
  formData.append("link", link);

  try {
    setLoading(true);

    const res = await fetch(`${API_BASE_URL}/api/materials`, {
      method: "POST",
      body: formData,
      redirect: "manual", // prevent automatic redirects
    });

    // Check if server returned a redirect
    if (res.status >= 300 && res.status < 400) {
      console.error("Redirect detected:", res.status, res.headers.get("location"));
      throw new Error("Server is redirecting POST request. Check API URL or HTTPS setup.");
    }

    // Check for errors
    if (!res.ok) {
      const text = await res.text(); // read raw response
      console.error("Server returned non-OK response:", res.status, text);
      throw new Error("Failed to create therapy material");
    }

    // Parse JSON safely
    const data = await res.json();
    console.log("Material created:", data);

    alert("Therapy Material created successfully 🎉");

    // Reset form
    setTitle("");
    setDescription("");
    setCategory("");
    setImage(null);
    setLink("");
  } catch (err: any) {
    console.error("Error creating therapy material:", err);
    alert(`Error creating therapy material: ${err.message}`);
  } finally {
    setLoading(false);
  }
};



  return (
    <div>
      <PageMeta title="Create Therapy Material | Admin Dashboard" />
      <PageBreadcrumb pageTitle="Create Therapy Material" />

      <div className="max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows={5}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Category */}
           <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Image */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            />
          </div>

          {/* Link */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Link
            </label>
            <input
              type="url"
              placeholder="Enter URL link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
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

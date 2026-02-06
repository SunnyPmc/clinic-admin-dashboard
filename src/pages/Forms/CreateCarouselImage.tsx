import { useRef, useState, ChangeEvent, FormEvent } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CreateTestimonialImageSingle() {
  // const [name, setName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle single image selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image); // ✅ MUST match upload.single("image")

    // if (name.trim()) {
    //   formData.append("name", name.trim());
    // }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/api/carousel`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        console.error(text);
        throw new Error("Upload failed");
      }

      alert("Image uploaded successfully 🎉");

      // Reset form
      // setName("");
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageMeta title="Upload Testimonial Image | Admin Dashboard" />
      <PageBreadcrumb pageTitle="Upload Testimonial Image" />

      <div className="max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name (Optional) */}
          {/* <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Name (Optional)
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div> */}

          {/* Image */}
          <div>
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              ref={fileInputRef}
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            />

            {image && (
              <p className="mt-2 text-sm text-gray-500">
                Selected: {image.name}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`rounded-lg px-4 py-2 font-medium text-white transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

        </form>
      </div>
    </div>
  );
}

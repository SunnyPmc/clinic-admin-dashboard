import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Define the type for a carousel image
interface CarouselImage {
  _id: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export default function CarouselImageTable() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch images from backend
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/carousel`)
      .then((res) => res.json())
      .then((data: CarouselImage[]) => {
        setImages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch carousel images:", err);
        setLoading(false);
      });
  }, []);

  // Delete image
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/carousel/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete image");

      // Remove deleted image from state
      setImages((prev) => prev.filter((img) => img._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting image");
    }
  };

  return (
    <div>
      <PageMeta title="Carousel Images | Admin Dashboard" description="View and manage all blogs in the admin dashboard" />
      <PageBreadcrumb pageTitle="Carousel Images" />

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="max-w-full overflow-x-auto">
          <Table className="min-w-full table-fixed border-collapse">
  {/* Table Header */}
  <TableHeader className="border-b border-gray-100 bg-gray-50">
    <TableRow>
      <TableCell
        isHeader
        className="w-1/3 px-5 py-3 text-gray-500 text-left"
      >
        Image
      </TableCell>
      <TableCell
        isHeader
        className="w-2/3 px-5 py-3 text-gray-500 text-left"
      >
        Action
      </TableCell>
    </TableRow>
  </TableHeader>

  {/* Table Body */}
  <TableBody className="divide-y divide-gray-100">
    {loading ? (
      <TableRow>
        <TableCell colSpan={2} className="text-center py-4">
          Loading...
        </TableCell>
      </TableRow>
    ) : images.length === 0 ? (
      <TableRow>
        <TableCell colSpan={2} className="text-center py-4">
          No images found.
        </TableCell>
      </TableRow>
    ) : (
      images.map((item) => (
        <TableRow key={item._id}>
          <TableCell className="px-5 py-4 text-left">
            <div className="w-20 h-14 overflow-hidden rounded-lg border">
              <img
                src={item.image}
                alt="Carousel"
                className="w-full h-full object-cover"
              />
            </div>
          </TableCell>

          <TableCell className="px-5 py-4 text-left">
            <button
              onClick={() => handleDelete(item._id)}
              className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
            >
              Delete
            </button>
          </TableCell>
        </TableRow>
      ))
    )}
  </TableBody>
</Table>

        </div>
      </div>
    </div>
  );
}

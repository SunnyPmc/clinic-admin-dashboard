import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table"; // adjust path if needed
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface TherapyMaterial {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  link?: string;
}

export default function TherapyMaterialsTable() {
  const [materials, setMaterials] = useState<TherapyMaterial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch therapy materials from backend
  useEffect(() => {
  fetch(`${API_BASE_URL}/api/materials`)
    .then((res) => res.json())
    .then((data) => {
      setMaterials(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
}, []);


  // Delete therapy material
  const handleDelete = async (_id: string) => {
    if (!confirm("Are you sure you want to delete this material?")) return;

    try {
     const res = await fetch(
  `${API_BASE_URL}/api/materials/${_id}`,
  { method: "DELETE" }
);


      if (!res.ok) throw new Error("Failed to delete");

      setMaterials((prev) => prev.filter((m) => m._id !== _id));
    } catch (err) {
      console.error(err);
      alert("Error deleting material");
    }
  };

  return (
    <div>
      <PageMeta title="Therapy Materials Table | Admin Dashboard" description="View and manage all blogs in the admin dashboard" />
      <PageBreadcrumb pageTitle="Therapy Materials Table" />

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Image
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Title
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Description
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Category
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Link
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : materials.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No therapy materials found.
                  </TableCell>
                </TableRow>
              ) : (
                materials.map((m) => (
                  <TableRow key={m._id}>
                    {/* Image */}
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="w-12 h-12 overflow-hidden rounded-lg">
                        <img
                          src={m.image}
                          alt={m.title}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </TableCell>

                    {/* Title */}
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {m.title}
                    </TableCell>

                    {/* Description */}
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {m.description.length > 50
                        ? m.description.slice(0, 50) + "..."
                        : m.description}
                    </TableCell>

                    {/* Category */}
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {m.category}
                    </TableCell>

                    {/* Link */}
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {m.link ? (
                        <a
                          href={m.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </a>
                      ) : (
                        "-"
                      )}
                    </TableCell>

                    {/* Action */}
                    <TableCell className="px-4 py-3 text-start">
                      <button
                        className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
                        onClick={() => handleDelete(m._id)}
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

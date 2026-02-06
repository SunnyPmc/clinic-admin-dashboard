import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table"; // Make sure this path is correct
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


interface Testimonial {
  _id: string;
  message: string;
  quote: string;
  name: string;
  designation: string;
}

export default function TestimonialsTable() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch testimonials from backend
  useEffect(() => {
  fetch(`${API_BASE_URL}/api/testimonials`)
    .then((res) => res.json())
    .then((data) => {
      setTestimonials(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
}, []);


  // Delete testimonial
  const handleDelete = async (_id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const res = await fetch(
  `${API_BASE_URL}/api/testimonials/${_id}`,
  { method: "DELETE" }
);


      if (!res.ok) throw new Error("Failed to delete");

      // Remove from state
      setTestimonials((prev) => prev.filter((t) => t._id !== _id));
    } catch (err) {
      console.error(err);
      alert("Error deleting testimonial");
    }
  };

  return (
    <div>
      <PageMeta title="Testimonials Table | Admin Dashboard" description="View and manage all blogs in the admin dashboard" />
      <PageBreadcrumb pageTitle="Testimonials Table" />

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
                  Message
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Quote
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Designation
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
                  <TableCell colSpan={5} className="text-center py-4">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : testimonials.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No testimonials found.
                  </TableCell>
                </TableRow>
              ) : (
                testimonials.map((t) => (
                  <TableRow key={t._id}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {t.message.length > 50
                        ? t.message.slice(0, 50) + "..."
                        : t.message}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {t.quote}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {t.name}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {t.designation}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-start">
                      <button
                        className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
                        onClick={() => handleDelete(t._id)}
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

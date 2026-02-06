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


interface Blog {
  _id: string;
  title: string;
  description: string;
  image: string;
  category?: string;
}

export default function BlogTable() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch blogs from backend
  useEffect(() => {
  fetch(`${API_BASE_URL}/api/blogs`)
    .then((res) => res.json())
    .then((data) => {
      setBlogs(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
}, []);


  // Delete blog
  const handleDelete = async (_id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/blogs/${_id}`, {
  method: "DELETE",
});


      if (!res.ok) throw new Error("Failed to delete");

      // Remove deleted blog from state
      setBlogs((prev) => prev.filter((b) => b._id !== _id));
    } catch (err) {
      console.error(err);
      alert("Error deleting blog");
    }
  };

  return (
    <div>
      {/* <PageMeta title="Blogs Table | Admin Dashboard" /> */}
      <PageMeta
  title="Blogs Table | Admin Dashboard"
  description="View and manage all blogs in the admin dashboard"
/>
      <PageBreadcrumb pageTitle="Blogs Table" />

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
                {/* <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Category
                </TableCell> */}
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
              ) : blogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No blogs found.
                  </TableCell>
                </TableRow>
              ) : (
                blogs.map((blog) => (
                  <TableRow key={blog._id}>
                    {/* Image */}
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="w-12 h-12 overflow-hidden rounded-lg">
                        <img
                          width={48}
                          height={48}
                          // src={`${API_BASE_URL}${blog.image}`}
                          src={blog.image}
                          alt={blog.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </TableCell>

                    {/* Title */}
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {blog.title}
                    </TableCell>

                    {/* Description */}
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {blog.description.length > 50
                        ? blog.description.slice(0, 50) + "..."
                        : blog.description}
                    </TableCell>

                    {/* Category */}
                    {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {blog.category || "-"}
                    </TableCell> */}

                    {/* Action */}
                    <TableCell className="px-4 py-3 text-start">
                      <button
                        className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
                        onClick={() => handleDelete(blog._id)}
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

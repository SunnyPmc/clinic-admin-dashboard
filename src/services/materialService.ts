import API from "./api";

export const createBlog = (data: FormData) =>
  API.post("/blogs", data);

export const getBlogs = () =>
  API.get("/blogs");

export const deleteBlog = (id: string) =>
  API.delete(`/blogs/${id}`);

export const getBlogById = (id: string) =>
  API.get(`/blogs/${id}`);

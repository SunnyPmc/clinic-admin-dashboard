import API from "./api";

export const createTestimonial = (data: FormData) =>
  API.post("/testimonials", data);

export const getTestimonials = () =>
  API.get("/testimonials");

export const deleteTestimonial = (id: string) =>
  API.delete(`/testimonials/${id}`);

import API from "./api";

export const createCarouselImage = (data: FormData) =>
  API.post("/carousel", data);

export const getCarouselImages = () =>
  API.get("/carousel");

export const deleteCarouselImage = (id: string) =>
  API.delete(`/carousel/${id}`);

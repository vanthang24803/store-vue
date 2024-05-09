import { _http } from "@/lib/api";
import { decodeSlug } from "@/lib/slug";

const fetchProducts = async () => {
  try {
    const response = await _http.get(`/api/product`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchDetailProduct = async (id) => {
  const response = await _http.get(`/api/product/${decodeSlug(id)}`);
  return response.data;
};

const fetchProductSelling = async () => {
  try {
    const response = await _http.get("/api/product/selling");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { fetchProducts, fetchDetailProduct, fetchProductSelling };

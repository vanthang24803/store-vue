import { _http } from "@/lib/api";

const fetchCategories = async () => {
  try {
    const res = await _http.get(`/api/product/category`);

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export { fetchCategories };

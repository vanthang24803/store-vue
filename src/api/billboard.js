import { _http } from '@/lib/api';

const fetchBillboard = async () => {
  try {
    const response = await _http.get(`/api/product/billboard`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { fetchBillboard };

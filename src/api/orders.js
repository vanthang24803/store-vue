import { _http } from '@/lib/api';

const fetchOrders = async () => {
  try {
    const res = await _http.get(`/api/order`);

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export { fetchOrders };

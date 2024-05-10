import { _http } from '@/lib/api';

const fetchVouchers = async () => {
  try {
    const res = await _http.get(`/api/product/voucher`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export { fetchVouchers };

import { _http } from '@/lib/api';

const handlerSearch = async (name) => {
  try {
    const response = await _http.get(`/api/product`, {
      params: {
        Name: name.value,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { handlerSearch };

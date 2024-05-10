import { _http } from '@/lib/api';
import { decodeSlug } from '@/lib/slug';

const fetchBlogs = async () => {
  try {
    const response = await _http.get(`/api/blog`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchBlogDetail = async (id) => {
  const res = await _http.get(`/api/blog/${decodeSlug(id)}`);
  if (res.status === 200) {
    return res.data;
  }
};

export { fetchBlogs, fetchBlogDetail };

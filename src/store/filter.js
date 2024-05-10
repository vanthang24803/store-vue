import { _http } from '@/lib/api';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('filter', {
  state: () => ({
    category: String,
    price: String,
    filter: String,
    products: [],
  }),
  actions: {
    async updateState(price, filter, category = '') {
      this.category = category;
      this.price = price;
      this.filter = filter;

      const response = await _http.get(
        `/api/product?Category=${category}&SortBy=${this.price}&Filter=${this.filter}`
      );
      this.products = response.data;
      return response;
    },
  },
  setup() {
    this.updateState(null, null, '');
  },
});

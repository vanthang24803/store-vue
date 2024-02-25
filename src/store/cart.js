import { defineStore } from "pinia";
import { useToast } from "@/components/ui/toast/use-toast";
import { price } from "@/lib/format";

const { toast } = useToast();

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),
  getters: {
    totalItems() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    },
    totalPrice() {
      let result = this.items.reduce(
        (total, item) =>
          total +
          (item.product.options[0].price -
            (item.product.options[0].price * item.product.options[0].sale) /
              100) *
            item.quantity,
        0
      );
      return `${price(result)}₫`;
    },
  },
  actions: {
    addItem(product, optionId, quantity = 1) {
      const item = this.items.find(
        (i) => i.product.id === product.id && i.optionId === optionId
      );
      if (item) {
        item.quantity += quantity;
      } else {
        this.items.push({ product, optionId, quantity });
      }
      toast({
        title: "Success",
      });
    },
    removeItem(productId, optionId) {
      this.items = this.items.filter(
        (i) => i.product.id !== productId || i.optionId !== optionId
      );
    },
    updateQuantity(productId, optionId, quantity) {
      const item = this.items.find(
        (i) => i.product.id === productId && i.optionId === optionId
      );
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart() {
      this.items = [];
    },
  },
  persist: true,
});

import { create } from "zustand";

const useProduct = create((set) => ({
  products: JSON.parse(localStorage.getItem("products")) || [],

  addProduct: (product) =>
    set((state) => {
      const updated = [...state.products, product];
      localStorage.setItem("products", JSON.stringify(updated));
      return { products: updated };
    }),

  removeProduct: (id) =>
    set((state) => {
      const updated = state.products.filter(p => p.id !== id);
      localStorage.setItem("products", JSON.stringify(updated));
      return { products: updated };
    }),
}));

export default useProduct;
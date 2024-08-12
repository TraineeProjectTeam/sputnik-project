import { ICartProduct, IProduct, IOrderProduct, IPagination } from '@/shared/libs/types';
import { addToCart, deleteProductInCart, getCartProduct, updateQuantityProduct } from '../api/api';
import { createWithEqualityFn } from 'zustand/traditional';

interface IUseCartStore {
  isLoading: boolean;
  isUpdating: boolean;
  cartProducts: IOrderProduct[];
  cartProductsId: ICartProduct[];
  currentPage: number;
  pagination: IPagination;
  setProductsIds: (cartProducts: ICartProduct[]) => void;
  getCartProducts: () => Promise<IOrderProduct[]>;
  refreshCart: () => Promise<any>;
  addToCart: (id: string) => Promise<IOrderProduct>;
  deleteFavorite: (id: string) => Promise<IProduct>;
  updateQuantity: (id: string, quantity: number) => Promise<IOrderProduct>;
  isInCart: (id: string) => boolean;
  quantity: () => number;
  price: () => number;
  discount: () => number;
  getProduct: (id: string) => ICartProduct;
  clearCart: () => void;
  reset: () => void;
}

export const useCartStore = createWithEqualityFn<IUseCartStore>((set, get) => ({
  isLoading: false,
  isUpdating: false,
  cartProducts: [],
  cartProductsId: [],
  currentPage: 0,
  pagination: {} as IPagination,
  setProductsIds: (cartProducts) => {
    set({ cartProductsId: cartProducts });
  },
  getCartProducts: async () => {
    try {
      set({ isLoading: true });
      set({ currentPage: get().currentPage + 1 });
      const data = await getCartProduct(get().currentPage);

      const products = data.products.filter(
        (product) =>
          !get().cartProducts.some((product2) => product.product._id === product2.product._id),
      );

      set({ cartProducts: [...get().cartProducts, ...products], pagination: data.pagination });
      return data.products;
    } catch {
      throw new Error();
    } finally {
      set({ isLoading: false });
    }
  },
  refreshCart: async () => {
    try {
      set({ currentPage: 1 });
      const data = await getCartProduct(get().currentPage);
      set({ cartProducts: data.products, pagination: data.pagination });
      return data.products;
    } catch {
      throw new Error();
    }
  },
  addToCart: async (id) => {
    try {
      set({ isUpdating: true });
      const data = await addToCart(id);
      set({ cartProducts: [data, ...get().cartProducts] });
      set({
        cartProductsId: [
          { product: data.product._id, quantity: data.quantity },
          ...get().cartProductsId,
        ],
      });
      return data;
    } catch {
      throw new Error();
    } finally {
      set({ isUpdating: false });
    }
  },
  deleteFavorite: async (id) => {
    try {
      set({ isUpdating: true });
      const data = await deleteProductInCart(id);
      set({
        cartProducts: get().cartProducts.filter((productId) => productId.product._id !== data._id),
      });
      set({
        cartProductsId: get().cartProductsId.filter((productId) => productId.product !== data._id),
      });
      return data;
    } catch {
      throw new Error();
    } finally {
      set({ isUpdating: false });
    }
  },
  updateQuantity: async (id, quantity) => {
    try {
      set({ isUpdating: true });
      const data = await updateQuantityProduct(id, quantity);
      set({
        cartProducts: get().cartProducts.map((item) =>
          data.product._id === item.product._id ? { ...data } : item,
        ),
      });
      set({
        cartProductsId: get().cartProductsId?.map((item) =>
          data.product._id === item.product
            ? { product: data.product._id, quantity: data.quantity }
            : item,
        ),
      });
      return data;
    } catch {
      throw new Error();
    } finally {
      set({ isUpdating: false });
    }
  },
  isInCart: (id) => get().cartProductsId?.some((item) => item.product === id),
  quantity: () => get().cartProductsId?.reduce((acc, current) => acc + current.quantity, 0),
  price: () =>
    get().cartProducts.reduce((acc, current) => acc + current.product.price * current.quantity, 0),
  discount: () =>
    get().cartProducts.reduce(
      (acc, current) => acc + current.product.discountPrice * current.quantity,
      0,
    ),
  getProduct: (id) => get().cartProductsId?.find((item) => item.product === id)!,
  clearCart: () => {
    get().cartProductsId.forEach(async (id) => {
      await deleteProductInCart(id.product);
    });
    set({ cartProducts: [], cartProductsId: [] });
  },
  reset: () => {
    set({ cartProducts: [], cartProductsId: [] });
  },
}));

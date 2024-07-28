import { create } from 'zustand';
import { IProduct } from './product.types';
import { api } from 'shared/api';

interface IProductsStore {
  productsForOrder: IProduct[];
  products: IProduct[];
  getProductByIds: (ids: string[]) => void;
  setProducts: (products: IProduct[]) => void;
  getProducts: (category: string) => Promise<IProduct[]>;
  loading: boolean;
  loadingProductsForOrder: boolean;
  setLoading: (loading: boolean) => void;
}

export const useProductsStore = create<IProductsStore>((set) => ({
  products: [],
  productsForOrder: [
    {
      _id: '66929c15ab2be458ce36ed75',
      name: 'Colorful Видеокарта GeForce RTX 4070 12 ГБ (iGame GeForce RTX 4070 Ultra W OC 12GB V3)',
      description:
        'Видеокарта Colorful iGame GeForce RTX 4070 Ultra W OC создана для компьютерных энтузиастов. Она обеспечивает высокую производительность, скорость и плавность графики. Архитектура Ada Lovelace с алгоритмами искусственного интеллекта DLS 3 и технологией трассировки лучей обеспечивает реалистичную передачу деталей и оттенков. Процессор функционирует на частоте 1920 МГц, которая способна увеличиваться до значения 2505 МГц при разгоне.',
      price: 92000,
      discountPrice: 62896,
      thumbnail: 'https://picsum.photos/200',
      images: [
        'https://i.ibb.co/CwMSFcz/7039351876.webp',
        'https://i.ibb.co/R4HVjf0/7039351888.webp',
        'https://i.ibb.co/DQwS5y4/7047355629.webp',
      ],
      reviews: [],
      vendor_id: '667e90be2ed468890d5f8e67',
      reviews_count: 124,
      category: 'Электроника',
      remaining: 32,
      characteristic: [],
      __v: 3,
      rating: 4.6,
      createdAt: '2024-07-27T12:14:37.120Z',
    },
    {
      _id: '6692a604ab2be458ce36edb4',
      name: 'Ветровка Limitless',
      description:
        'Женская ветровка - это стильная и практичная верхняя одежда, которая имеет короткую длину и застежку на молнии. Идеальный выбор для стильных модниц, которые ценят комфорт, функциональность и шикарный внешний вид своей одежды. Легкая куртка обладает всеми необходимыми качествами, чтобы стать незаменимым спутником летом и осенью. Ветровка женская большого размера - это идеальная находка для активных и модных леди.',
      price: 9000,
      discountPrice: 2225,
      thumbnail: 'https://i.ibb.co/mtnC6Qp/7017920044-1.webp',
      images: [
        'https://i.ibb.co/4RkrC3p/6985496739.webp',
        'https://i.ibb.co/Nywvw3T/6985496772.webp',
        'https://i.ibb.co/HCxfcfs/7017920044.webp',
      ],
      reviews: ['66a0e2ab6a48f1ffde966d8e'],
      vendor_id: '668043aa4f5c9f60375810b5',
      category: 'Одежда',
      remaining: 12,
      characteristic: [
        ['Размер', '42'],
        ['Размер', '46'],
      ],
      __v: 4,
      rating: 4.9,
      reviews_count: 1,
      createdAt: '2024-07-27T12:14:37.121Z',
    },
  ],
  loadingProductsForOrder: false,
  loading: false,
  getProductByIds: async (ids: string[]) => {
    try {
      set({ loadingProductsForOrder: true });
      const { data } = await api.get<IProduct[]>('/products');
      const productsForOrder = data.filter((product) => ids.includes(product._id));
      set({
        productsForOrder,
      });
    } catch (error: any) {
      set({ productsForOrder: [] });
      throw new Error(error.message);
    } finally {
      set({ loadingProductsForOrder: false });
    }
  },
  getProducts: async (category) => {
    try {
      set({ loading: true });
      const { data } = await api.post<IProduct[]>('/products', { category });
      set({ products: data });
      return data;
    } catch (error: any) {
      set({ products: [] });
      throw new Error(error.message);
    } finally {
      set({ loading: false });
    }
  },
  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
}));

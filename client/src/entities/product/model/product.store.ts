import { create } from 'zustand';
import { IProduct } from './product.types';
import {
  getProductsByCategoryRequest,
  getProductsRequest,
  updateProductRequest,
} from '../api/product.api';

interface IProductsStore {
  productsForVendor: IProduct[];
  productsForOrder: IProduct[];
  productsByCategory: IProduct[];
  isLoadingForVendor: boolean;
  isLoadingProductsForOrder: boolean;
  isLoadingByCategory: boolean;
  updateProduct: (updatedProduct: IProduct) => void;
  getProductByIds: (ids: string[]) => void;
  getProductsByCategory: (category: string) => void;
  setProducts: (products: IProduct[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useProductsStore = create<IProductsStore>((set, get) => ({
  productsForVendor: [
    {
      _id: '66995f7ecc1ec96dfb6c8648',
      name: 'Shark Fit, Ролик для пресса с ковриком/ Двойное гимнастическое колесо/ Спортивное колесо для пресса',
      description:
        'Заполучить тело мечты, и не ходить при этом в спортзал, вам поможет ролик для пресса. Небольшое колесико для пресса заставит ваши мышцы просто “гореть” во время домашних тренировок. Многие спортсмены уже давно отмечают, что гимнастический ролик является прекрасной альтернативой громоздким спортивным тренажерам, а результат от занятий с ним очень впечатляет. Гимнастическое колесо подходит как новичкам, так и профессионалам для поддержания формы — с ним можно тренировать как прямые, так и косые мышцы живота, поворачивая колесо для пресса вправо и влево. Также ролик для пресса спортивный хорошо тренирует мышцы спины, рук, ног, бедер и грудные мышцы. Ролик гимнастический подходит для всех уровней физической подготовки и популярен не только у спортсменов, но и у тех, кто только начинает свой путь. ',
      price: 1999,
      discountPrice: 686,
      rating: 5,
      thumbnail: 'https://i.ibb.co/YcsLcMF/6488422188.webp',
      images: [
        'https://i.ibb.co/YcsLcMF/6488422188.webp',
        'https://i.ibb.co/PgWCfpK/6488422190.webp',
        'https://i.ibb.co/LYGqND2/6689482663.webp',
      ],
      reviews: [],
      vendor_id: '667012aa53ea02ab64d03363',
      reviews_count: 3,
      category: 'Спорт и отдых',
      remaining: 100,
      characteristic: [
        ['Страна-изготовитель', 'Китай'],
        ['Цвет', 'Черный'],
        ['Длина', '18 см'],
        ['Тип', 'Ролик для пресса'],
      ],
      __v: 0,
      createdAt: '2024-08-06T11:11:03.721Z',
    },
    {
      _id: '66995fc1cc1ec96dfb6c864c',
      name: 'Спортивный фитнес набор для тренировок дома',
      description:
        'Спортивный набор "Сила и выносливость" - твой путь к идеальному телу! В наборе ты найдешь:\n\n1. Скакалка: Развивает координацию, сжигает калории и тренирует сердечно-сосудистую систему.\n\n2. Ролик: Прокачивает пресс, спину, плечи и руки.\n\n3. Два упора для отжиманий: Помогают сделать отжимания более эффективными и уменьшают нагрузку на запястья.\n\n4. Эспандер: Подходит для упражнений на кисти и силу хвата, позволяет регулировать нагрузку.\n\n5. Спортивная резина: Универсальный инструмент для растяжки, силовых упражнений и пилатеса.\n\nПреимущества набора:\n\nУниверсальность: Подходит для людей с любым уровнем подготовки. Эффективность: Помогает достичь желаемых результатов в кратчайшие сроки. Экономичность: Позволяет сэкономить на покупке спортивного инвентаря. Компактность: Легко хранить и брать с собой в поездки.\n\nС помощью нашего набора ты сможешь:\n\nСбросить лишний вес, Укрепить мышцы, Развить выносливость, Улучшить координацию, Сделать свое тело более подтянутым и рельефным.\n\nЗакажи спортивный набор "Сила и выносливость" сегодня и сделай первый шаг к своему идеальному телу',
      price: 3095,
      discountPrice: 1935,
      rating: 5,
      thumbnail: 'https://i.ibb.co/JCNGvbN/7067901428.webp',
      images: [
        'https://i.ibb.co/JCNGvbN/7067901428.webp',
        'https://i.ibb.co/d0tGTDh/7067901453.webp',
        'https://i.ibb.co/qDxhmTF/7067901498.webp',
      ],
      reviews: ['66719a745f2d5e041e20b11d', '66719a585f2d5e041e20b11c'],
      vendor_id: '667012aa53ea02ab64d03363',
      reviews_count: 2,
      category: 'Спорт и отдых',
      remaining: 52,
      characteristic: [
        ['Страна-изготовитель', 'Китай'],
        ['Целевая аудитория', 'Детская'],
        ['Длина, см', '25'],
        ['Особенности фитнес-инвентаря', 'Набор'],
      ],
      __v: 0,
      createdAt: '2024-08-06T11:11:03.721Z',
    },
  ],
  productsByCategory: [],
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
  isLoadingForVendor: false,
  isLoadingByCategory: false,
  isLoadingProductsForOrder: false,
  getProductByIds: async (ids: string[]) => {
    try {
      set({ isLoadingProductsForOrder: true });
      const response = await getProductsRequest();
      const productsForOrder = Object.values(response.data).filter((product) =>
        ids.includes(product._id),
      );
      set({
        productsForOrder,
      });
    } catch (error: any) {
      set({ productsForOrder: [] });
      throw new Error(error.message);
    } finally {
      set({ isLoadingProductsForOrder: false });
    }
  },
  updateProduct: async (updatedProduct: IProduct) => {
    try {
      set({ isLoadingForVendor: true });
      await updateProductRequest({ updatedProduct });
      set({
        productsForVendor: get().productsForVendor.map((product) =>
          product._id === updatedProduct._id ? { ...product, ...updatedProduct } : product,
        ),
      });
    } catch (error: any) {
      set({ productsForVendor: [] });
      throw new Error(error.message);
    } finally {
      set({ isLoadingForVendor: false });
    }
  },
  getProductsByCategory: async (category) => {
    try {
      set({ isLoadingByCategory: true });
      const response = await getProductsByCategoryRequest(category);
      set({ productsByCategory: response.data });
    } catch (error: any) {
      set({ productsByCategory: [] });
      throw new Error(error.message);
    } finally {
      set({ isLoadingByCategory: false });
    }
  },
  setProducts: (productsByCategory) => set({ productsByCategory }),
  setLoading: (isLoadingByCategory) => set({ isLoadingByCategory }),
}));

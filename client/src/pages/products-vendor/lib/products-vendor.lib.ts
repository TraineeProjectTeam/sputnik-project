import { IProduct } from 'entities/product';
import { TFunction } from 'i18next';
import { IProductField } from '../model/products-vendor.types';
import { categoriesData } from 'entities/category';

export const getProductsVendorFields = (
  tErr: TFunction,
  tProduct: TFunction,
  tCategories: TFunction,
  product: IProduct | null,
): IProductField[] => {
  return [
    {
      label: tProduct('Название'),
      name: 'name',
      value: product?.name || '',
      type: 'text',
      rules: [
        {
          type: 'string',
          required: true,
          message: tErr('Пожалуйста, введите поле продукта!', { field: tProduct('Название') }),
        },
      ],
    },
    {
      label: tProduct('Описание'),
      name: 'description',
      type: 'text',
      value: product?.description || '',
      rules: [
        {
          type: 'string',
          required: true,
          message: tErr('Пожалуйста, введите поле продукта!', { field: tProduct('Описание') }),
        },
      ],
    },
    {
      label: tProduct('Категория'),
      name: 'category',
      value: product?.category || '',
      type: 'select',
      values: categoriesData(tCategories),
      rules: [
        {
          type: 'string',
          required: true,
          message: tErr('Пожалуйста, введите поле продукта!', { field: tProduct('Категория') }),
        },
      ],
    },
    {
      label: tProduct('Цена'),
      name: 'price',
      value: product?.price.toString() || '',
      type: 'number',
      rules: [
        {
          required: true,
          message: tErr('Пожалуйста, введите поле продукта!', { field: tProduct('Цена') }),
        },
        {
          validator: (_, value) => {
            if (value <= 0) {
              return Promise.reject(new Error(tErr('Цена должна быть больше нуля!')));
            }
            return Promise.resolve();
          },
        },
      ],
    },
    {
      label: tProduct('Цена со скидкой'),
      name: 'discountPrice',
      value: product?.discountPrice?.toString() || '',
      type: 'number',
      rules: [
        {
          required: true,
          message: tErr('Пожалуйста, введите поле продукта!', {
            field: tProduct('Цена со скидкой'),
          }),
        },
        {
          validator: (_, value) => {
            if (value <= 0) {
              return Promise.reject(new Error(tErr('Цена должна быть больше нуля!')));
            }
            return Promise.resolve();
          },
        },
      ],
    },
    {
      label: tProduct('Эскиз'),
      name: 'thumbnail',
      value: product?.thumbnail || '',
      type: 'image',
      rules: [
        {
          required: true,
          message: tErr('Пожалуйста, введите поле продукта!', {
            field: tProduct('Эскиз'),
          }),
        },
      ],
    },
    {
      label: tProduct('Картинки'),
      name: 'images',
      values: product?.images || [],
      type: 'images',
      rules: [
        {
          required: true,
          message: tErr('Пожалуйста, введите поле продукта!', {
            field: tProduct('Картинки'),
          }),
        },
      ],
    },
  ];
};

export const getInitialEditableValues = (editableProduct: IProduct | null, t: TFunction) => {
  return {
    name: editableProduct?.name,
    description: editableProduct?.description,
    category: editableProduct?.category && t(editableProduct.category),
    price: editableProduct?.price,
    discountPrice: editableProduct?.discountPrice,
    thumbnail: editableProduct?.thumbnail,
    images: editableProduct?.images,
  };
};

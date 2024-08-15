import { IProduct } from 'entities/product';
import { TFunction } from 'i18next';
import { IProductField } from '../model/products-vendor.types';
import { categoriesData } from 'entities/category';

export const getProductsVendorFields = (
  t: TFunction,
  product: IProduct | null,
): IProductField[] => {
  return [
    {
      label: t('Название'),
      name: 'name',
      value: product?.name || '',
      type: 'text',
      rules: [
        {
          type: 'string',
          required: true,
          message: t('Пожалуйста, введите поле продукта!', { field: t('Название') }),
        },
      ],
    },
    {
      label: t('Описание'),
      name: 'description',
      type: 'text',
      value: product?.description || '',
      rules: [
        {
          type: 'string',
          required: true,
          message: t('Пожалуйста, введите поле продукта!', { field: t('Описание') }),
        },
      ],
    },
    {
      label: t('Категория'),
      name: 'category',
      value: product?.category || '',
      type: 'select',
      values: categoriesData(t),
      rules: [
        {
          type: 'string',
          required: true,
          message: t('Пожалуйста, введите поле продукта!', { field: t('Категория') }),
        },
      ],
    },
    {
      label: t('Цена'),
      name: 'price',
      value: product?.price.toString() || '',
      type: 'number',
      rules: [
        {
          required: true,
          message: t('Пожалуйста, введите поле продукта!', { field: t('Цена') }),
        },
        {
          validator: (_, value) => {
            if (value <= 0) {
              return Promise.reject(new Error(t('Цена должна быть больше нуля!')));
            }
            return Promise.resolve();
          },
        },
      ],
    },
    {
      label: t('Цена со скидкой'),
      name: 'discountPrice',
      value: product?.discountPrice?.toString() || '',
      type: 'number',
      rules: [
        {
          required: true,
          message: t('Пожалуйста, введите поле продукта!', {
            field: t('Цена со скидкой'),
          }),
        },
        {
          validator: (_, value) => {
            if (value <= 0) {
              return Promise.reject(new Error(t('Цена должна быть больше нуля!')));
            }
            return Promise.resolve();
          },
        },
      ],
    },
    {
      label: t('Эскиз'),
      name: 'thumbnail',
      value: product?.thumbnail || '',
      type: 'image',
      rules: [
        {
          required: true,
          message: t('Пожалуйста, введите поле продукта!', {
            field: t('Эскиз'),
          }),
        },
      ],
    },
    {
      label: t('Картинки'),
      name: 'images',
      values: product?.images || [],
      type: 'images',
      rules: [
        {
          required: true,
          message: t('Пожалуйста, введите поле продукта!', {
            field: t('Картинки'),
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

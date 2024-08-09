import { IProduct } from 'entities/product';
import { TFunction } from 'i18next';
import { FileType, IEditableProductField } from '../model/products-vendor.types';
import { categoriesData } from 'entities/category';

export const getProductsVendorFields = (
  tErr: TFunction,
  tProduct: TFunction,
  tCategories: TFunction,
  editableProduct: IProduct | null,
): IEditableProductField[] => {
  return [
    {
      label: tProduct('Название'),
      name: 'name',
      value: editableProduct?.name || '',
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
      value: editableProduct?.description || '',
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
      value: editableProduct?.category || '',
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
      value: editableProduct?.price.toString() || '',
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
      value: editableProduct?.discountPrice?.toString() || '',
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
      value: editableProduct?.thumbnail || '',
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
      values: editableProduct?.images || [],
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

export const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

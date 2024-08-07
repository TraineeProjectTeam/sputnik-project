import { Rule } from 'antd/es/form';
import { ICategory } from 'entities/category';

export type TypeProductField = 'select' | 'number' | 'text' | 'image';

export interface IEditableProductField {
  label: string;
  name: string;
  type: TypeProductField;
  value?: string | number;
  rules: Rule[];
  values?: ICategory[] | string[];
}

export interface IInitialValuesFields {
  name: string | undefined;
  description: string | undefined;
  category: string | undefined;
  price: number | undefined;
  discountPrice: number | undefined;
  thumbnail: string | undefined;
  images: string[] | undefined;
}

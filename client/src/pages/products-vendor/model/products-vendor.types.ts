import { GetProp, UploadProps } from 'antd';
import { Rule } from 'antd/es/form';
import { ICategory } from 'entities/category';

export type TypeProductField = 'select' | 'number' | 'text' | 'image' | 'images';

export interface IProductField {
  label: string;
  name: string;
  type: TypeProductField;
  value?: TypeProductField extends 'number' ? number : string;
  rules: Rule[];
  values?: TypeProductField extends 'images' ? string[] : ICategory[] | string[];
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

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

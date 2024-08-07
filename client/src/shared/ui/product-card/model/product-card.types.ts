import { IProduct } from 'entities/product';

export interface IProductCardProps {
  product: IProduct;
  isEditingProduct?: boolean;
}

export interface IProduct {
  readonly _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  rating?: number;
  thumbnail: string;
  images: string[];
  reviews_count?: number;
  category: string;
  remaining: number;
}

export interface IUpdateProductRequestParams {
  updatedProduct: IProduct;
}

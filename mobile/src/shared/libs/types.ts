interface ICustomer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
}

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  rating: number;
  thumbnail: string;
  tags: string[];
  imagesUrl: string[];
}

interface IOrder {
  id: number;
  status: string;
  orderData: Date;
  estimatedDeliveryDate: Date;
  deliveryDate: Date;
  price: number;
}

interface IVendors {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  companyName: string;
  addres: IAddress;
}

interface IReview {
  customerFullName: string;
  rating: number;
  body: string;
}

interface IAddress {
  region: string;
  city: string;
  streetName: string;
  streetNumber: string;
}

interface IPickupPoint {
  id: number;
  address: IAddress;
  longitude: string;
  latitude: string;
}

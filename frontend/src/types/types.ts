export interface ICategory {
  categoryID: number;
  categoryName: string;
}

export interface ICategoryResponse {
  count: number;
  items: ICategory[];
}

export interface ICategoryCreate extends Omit<ICategory, "categoryID"> {}

export interface IProduct {
  productID: number;
  productName: string;
  imageUrl: string;
  unitPrice: number;
  unitsInStock: number;
  category: ICategory;
}

export interface IProductResponse {
  items: IProduct[];
  count: number;
}

export interface IProductFormInput {
  productName: string;
  unitPrice: number;
  unitsInStock?: number;
  categoryID: number;
  image: FileList;
}

export interface IValidationRules {
  [key: string]: {
    required?: string;
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
    min?: number;
    validate?: (value: number) => boolean | string;
    value?: any;
  };
}

export interface IOrder {
  orderID: number;
  orderLocation: string;
  orderDate: Date;
  orderStatus: string;
  products: IOrderProduct[];
}

export interface IOrderUpdate extends Omit<IOrder, "orderID" | "products"> {}

export interface IOrderProduct extends Omit<IProduct, "category"> {
  quantity: number;
  categoryID: number;
}

export interface IOrderResponse {
  count: number;
  items: IOrder[];
}

export interface IOrderFormInput {
  status: string;
}

export enum OrderStatusEnum {
  PENDING,
  CANCELLED,
  DELIVERED,
}

export interface ICategoryFormInput {
  category: string;
}

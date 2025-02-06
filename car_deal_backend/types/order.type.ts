import { ORDER_STATUS } from "../constants/orderStatus";

export interface IOrder {
  _id: string
  carName: string;
  totalPrice: number;
  carImageName: string;
  carImageCloudId: string;
  carImageCloudUrl: string;
  carQuantity: number;
  orderStatus: ( typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
  userEmail: string;
  userPhoneNumber: string;
}

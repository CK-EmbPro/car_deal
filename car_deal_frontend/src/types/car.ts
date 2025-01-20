export interface ICar {
  name: string;
  price: number;
  category: string;
  description: string;
  isLiked: boolean
  carImageName: string;
  carImageCloudId: string;
  carImageCloudUrl: string;
}

export interface ISavedCar extends ICar {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
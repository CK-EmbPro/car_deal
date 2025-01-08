import { IUser } from "./user.type";

export interface ISubscription extends Pick<IUser, 'email' | 'phoneNumber' | 'profilePhotoName' | 'profilePhotoCloudId' | 'profilePhotoCloudUrl' > {}

export interface ILoginData{
    email: string;
    password: string
}

export interface IUser{
    firstName:string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    profilePhotoName: string;
    profilePhotoCloudId: string;
    profilePhotoCloudUrl: string
}

export interface ISavedUser extends IUser{
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}
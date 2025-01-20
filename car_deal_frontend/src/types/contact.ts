export interface IContact {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    message: string;
}

export interface ISavedContact extends IContact {
    _id: string;
    createdAt: string;
    updatedAt: string;
}
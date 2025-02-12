export class ApiResponse<T=any>{
    message: string;
    entity: T;

    constructor(message:string, entity:T){
        this.message = message;
        this.entity = entity;
    }
}
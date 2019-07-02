export class UserModel {
    _id: any = null;
    name: string = null;
    password: any = null;

    constructor(values: Object = []) {
        Object.assign(this, values);
    }

}
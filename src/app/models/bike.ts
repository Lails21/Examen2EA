import { __assign } from 'tslib';

export class Bike {

    constructor(_id = '', bike = '', kms = '', description = '', assigned = false){
        this._id = _id;
        this.bike = bike;
        this.kms = kms;
        this.description = description;
        this.assigned = assigned;
    }

    _id: string;
    bike: string;
    kms: string;
    description: string;
    assigned: boolean;
}
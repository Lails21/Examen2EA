import { Bike } from './bike';
export class Station {

    constructor(_id = '', station = '', state = '', description = '', bike = null){
        this._id = _id;
        this.station = station;
        this.state = state;
        this.description = description;
        this.bike = bike;        
    }

    _id: string;
    station: string;
    state: string;
    description: string;
    bike: Bike[];
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bike } from '../models/bike';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  selectedBike: Bike;
  bikes: Bike[];
  readonly URL_API = 'http://localhost:3000/bikes';

  constructor(private http: HttpClient) { 
    this.selectedBike = new Bike();
  }

  getBikes():Observable<Bike[]>{
    return this.http.get<Bike[]>(this.URL_API);
  }

  postBike(Bike: Bike){
    return this.http.post(this.URL_API, Bike);
  }

  deleteBike(_id: string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}

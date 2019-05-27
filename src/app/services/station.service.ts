import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Station } from '../models/station';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StationService {
  selectedStation: Station;
  stations: Station[];
  readonly URL_API = 'http://localhost:3000/stations';

  constructor(private http: HttpClient) { 
    this.selectedStation = new Station();
  }

  getStations():Observable<Station[]>{
    return this.http.get<Station[]>(this.URL_API);
  }

  getStationDetail(_id: string):Observable<Station>{
    return this.http.get<Station>(this.URL_API + `/${_id}`);
  }

  putBikeStation(stationId: string, bikeId: string){
    return this.http.put(this.URL_API + '/', {"stationId": stationId, "bikeId": bikeId});
  }

  deleteBikeStation(stationId: string, bikeId: string){
    return this.http.delete(this.URL_API + `/${stationId}/${bikeId}`);
  }
}
import { Component, OnInit } from '@angular/core';
import { Station } from 'src/app/models/station';
import { Bike } from 'src/app/models/bike';
import { ActivatedRoute } from '@angular/router';
import { StationService } from 'src/app/services/station.service';
import { BikeService } from 'src/app/services/bike.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  station: Station;
  bikesList: Bike[] = [];
  stationId: string;
  bikeId: string;

  constructor(private activatedRouter: ActivatedRoute, private stationService: StationService, private bikeService: BikeService) { 
    this.station = new Station();
    this.stationId="";
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params =>{
      if (typeof params ['id'] !== 'undefined'){
        this.station._id = params['id'];
      }
      else{
        this.station._id = '';
      }
    });
    this.getBikes();
    this.getInfoStation(this.station._id);
  }

  getBikes(){
    this.bikeService.getBikes()
      .subscribe(res => {
        this.bikesList= res;
        console.log("Hola");
        console.log(res);
      });
  }

  getInfoStation(_id: string){
    this.stationService.getStationDetail(_id)
    .subscribe(res => {
      this.station = res;
    console.log(res);
    console.log(_id); 
    console.log(this.station);
    });
    this.stationId = _id;

  }

  putBikeStation(_id: string){
    this.bikeId = _id;
    console.log("Station" + this.stationId);
    console.log("Student" + this.bikeId);

    this.stationService.putBikeStation(this.stationId, this.bikeId)
    .subscribe(res => {
      this.getBikes();
      this.getInfoStation(this.stationId);
    }); 
  
  }

  deleteBikeStation(_id: string, i: number){
    this.bikeId = _id;
    console.log("Station" + this.stationId);
    console.log("Student" + this.bikeId);

    this.stationService.deleteBikeStation(this.stationId, this.bikeId)
    .subscribe(res => {
      //this.getBikes();
      console.log("DELETE BIKES!!!!!!!!!");
      this.station.bike.splice(i, 1);
      this.getInfoStation(this.stationId);
    },
    (error)=> {
        console.log("EEEEEROR ", error);
        console.log("bici  a esborrar ", i);
        
        this.station.bike.splice(i, 1);
      });
  }

}
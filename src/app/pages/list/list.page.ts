import { Component, OnInit } from '@angular/core';
import {Station} from '../../models/station';
import {Bike} from '../../models/bike';
import {ActivatedRoute} from '@angular/router';
import {StationService} from '../../services/station.service';
import {BikeService} from '../../services/bike.service';
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  stationBikeDetail: Station;
  unassignedBikes: Bike[];
  body: object;

  constructor(private activatedRouter: ActivatedRoute, private stationService: StationService, private bikeService: BikeService,
              private alertController: AlertController) {
    this.stationBikeDetail = new Station();
    this.unassignedBikes = [];
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      if (typeof params.stationId !== 'undefined') {
        this.stationBikeDetail._id = params.stationId;
      } else {
        this.stationBikeDetail._id = '';
      }
    });
    this.getBikeDetail(this.stationBikeDetail._id);
    this.getUnassignedBikes();
  }

  async presentAlert(id: string, i: number) {
    const alert = await this.alertController.create({
      subHeader: 'Be careful!',
      message: 'Are you sure you want to delete this bike?',
      buttons: [{
        text: 'Cancel'
      }, {
        text: 'Delete',
        handler: () => {
          this.deleteBikeStation(id, i);
        }
      }]
    });

    await alert.present();
  }

  async getUnassignedBikes() {
    await this.bikeService.getBikes()
        .subscribe(res => {
          console.log(res);
          this.unassignedBikes = res as Bike[];
        });
    console.log(this.unassignedBikes);
  }

  async getBikeDetail(id: string) {
    await this.stationService.getStationDetail(id)
        .subscribe(res => {
          console.log(res);
          this.stationBikeDetail = res as Station;
        });
    console.log(this.stationBikeDetail);
  }

  async deleteBikeStation(id: string, i: number) {
    await this.stationService.deleteBikeStation(this.stationBikeDetail._id, id)
          .subscribe(res => {
                console.log(res);
                this.stationBikeDetail.bike.splice(i, 1);
                this.getUnassignedBikes();
              },
              err => {
                console.log(err);
              });
  }

 /* async addBikeStation(id: string, i: number) {
    this.body = {
      stationId: this.stationBikeDetail._id,
      bikeId: id
    };
    await this.stationService.putBikeStation(this.body)
        .subscribe(res => {
              console.log(res);
              this.unassignedBikes.splice(i, 1);
              this.getBikeDetail(this.stationBikeDetail._id);
            },
            err => {
              console.log(err);
            });
  }*/
}
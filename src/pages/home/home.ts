import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

import { ListRodPage } from '../listRod/listRod';

import { DictionariesPage } from '../dictionaries/dictionaries';

import { WarehousePage } from '../warehouse/warehouse';

import { StorageService } from '../../services/StorageService';

import { AuthService } from '../../services/AuthService';

import { LoadingController } from 'ionic-angular';

import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";

declare var window: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private storageService: StorageService,
              public loadingCtrl: LoadingController,
              private http: Http,
              private platform: Platform,
              private authService: AuthService) {

  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.loginToGoggle();
  }

  goToListRod() {
    console.log("goToListRod");
    this.navCtrl.push(ListRodPage);
  }

  goToDictionaries() {
    console.log("goToDictionaries");
    this.navCtrl.push(DictionariesPage);
  }

  goToWarehouse() {
    console.log("goToWarehouse");
    this.navCtrl.push(WarehousePage);
  }

  synchronizeWithWarehouse2() {
    console.log("synchronizeWithWarehouse");
    let loader = this.getLoaderPopUp();
    this.storageService.getAllRodsPromise().then((val) => {
      loader.present();
      if(val) {
        console.log("start");
        this.http.get('http://httpbin.org/delay/1')
                  .map((res: Response) => res.json())
                  .subscribe(data => {
                                console.log("joined :" + data.length)
                                loader.dismiss()
                             },
                             err => console.error(err),
                             () => console.log("ok" ));
      }
    })
  }

  synchronizeWithWarehouse() {
    console.log("synchronizeWithWarehouse");
    let loader = this.getLoaderPopUp();
    this.storageService.getAllRodsPromise().then((val) => {
      loader.present();
      if(val) {
        console.log("val :" + val)
        let url = this.storageService.createUpdateUrl(val.rods);
        let body = this.storageService.createUpdateBody(val.rods);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.authService.token.access_token);
        console.log("start");
        this.http.put(url,JSON.stringify(body),{headers: headers})
          .map((res: Response) => res.json())
          .subscribe(data => {
              console.log("result :" + data)
              loader.dismiss()
            },
            err => {
              console.error(err)
              loader.dismiss()
            },
            () => console.log("ok" ));
      }
    })
  }

  private getLoaderPopUp() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    return loader;
  }

  // public loginToGoggle() {
  //   if(this.authService.token){
  //     console.log("Auth:" + this.authService.token.access_token);
  //   } else {
  //     console.log("NO auth");
  //     this.authService.call();
  //   }
  // }

  public loginToGoggle() {
    this.platform.ready().then(() => {
      if(this.authService.token){
        console.log("Auth:" + this.authService.token.access_token);
      } else {
        console.log("NO auth");
        this.authService.call();
      }
    });
  }
}

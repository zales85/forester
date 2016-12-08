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

import { AlertController } from 'ionic-angular';

declare var window: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private new_access_token;

  constructor(public navCtrl: NavController,
              private storageService: StorageService,
              public loadingCtrl: LoadingController,
              private http: Http,
              private platform: Platform,
              private authService: AuthService,
              private alertController: AlertController) {

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

  synchronizeWithWarehouse() {
    console.log("synchronizeWithWarehouse");
    this.storageService.getAllRodsPromise().then((val) => {
      if(val) {
        console.log("val :" + val);
        console.log("val.rods :" + val.rods.length);
        var rodsToSynchronize =  val.rods.filter(this.isEligibleForSynchronization);
        var rodsNotSynchronized =  val.rods.filter(this.isNotSynchronized);
        console.log("rodsToSynchronize :" + rodsNotSynchronized.length);
        if(rodsNotSynchronized.length > 0) {
          let loader = this.getLoaderSynchPopUp(rodsNotSynchronized.length);
          loader.present();
          let url = this.storageService.createUpdateUrl(rodsToSynchronize);
          let body = this.storageService.createUpdateBody(rodsToSynchronize);
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', 'Bearer ' + this.new_access_token);
          console.log("start calling synchronize http");
          this.http.put(url,JSON.stringify(body),{headers: headers})
            .map((res: Response) => res.json())
            .subscribe(data => {
                console.log("result :" + data);
                this.storageService.markRodsAsSynchronized(rodsToSynchronize);
                loader.dismiss()
              },
              err => {
                console.error(err)
                loader.dismiss()
                this.showErrorPopUp()
              },
              () => {
                console.log("ok" )

              });
        } else {
          console.log("rodsToSynchronize SKIPPED");
          this.showSyncSkipped();
        }

      }
    })
  }

  showSyncSkipped() {
    let alert = this.alertController.create({
      title: 'Informacja',
      subTitle: 'Brak RODów do sychronizacji z magazynem',
      buttons: ['OK']
    });
    alert.present();
  }

  isEligibleForSynchronization(element, index, array) {
    return (element['estimated'] == true);
  }

  isNotSynchronized(element, index, array) {
    return (element['synchronized'] == false && element['estimated'] == true);
  }

  refreshToken() {
    console.log("refreshToken");
    let loader = this.getLoaderAuthPopUp();
    let url = this.storageService.createRefreshTokenUrl();
    let body = this.storageService.createRefreshTokenBody();
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    console.log("start calling refresh token http");
    this.http.post(url,body,{headers: headers})
      .map((res: Response) => res.json())
      .subscribe(data => {
          console.log("result :" + data.access_token)
          this.new_access_token = data.access_token;
          loader.dismiss()
        },
        err => {
          console.log("err" )
          console.error(err)
          loader.dismiss()
          this.showErrorPopUp()
        },
        () => {
          console.log("ok" )
        });
  }

  private showErrorPopUp() {
    let alert = this.alertController.create({
      title: 'Error',
      subTitle: 'Komunikacja z serwerem zakończona niepowodzeniem',
      buttons: ['Kontynuj']
    });
    alert.present();
  }

  private getLoaderSynchPopUp(rodsToSynchronization) {
    let loader = this.loadingCtrl.create({
      content: "Komunikacja z serwerem przesyałanie " + rodsToSynchronization + " ROD-ów do magazynu"
    });
    return loader;
  }

  private getLoaderAuthPopUp() {
    let loader = this.loadingCtrl.create({
      content: "Autoryzacja aplikacji, proszę czekać"
    });
    return loader;
  }

  public loginToGoggle() {
    this.platform.ready().then(() => {
      this.refreshToken();
    });
  }
}

import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { DictionaryService } from "../../services/DictionaryService";
import { ListDictionaryPage } from '../listDictionary/listDictionary';
import { LoadingController } from 'ionic-angular';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import { AlertController } from 'ionic-angular';
import { StorageService } from '../../services/StorageService';

@Component({
  selector: 'page-dictionaries',
  templateUrl: 'dictionaries.html'
})
export class DictionariesPage {

  constructor(public navCtrl: NavController,
              public dictionaryService: DictionaryService,
              public loadingCtrl: LoadingController,
              private http: Http,
              private alertController: AlertController,
              private storageService: StorageService) {

  }

  showPlansDictionary() {
    console.log("showPlansDictionary");
    this.navCtrl.push(ListDictionaryPage, {"dictionary": this.dictionaryService.getPlans()});
  }

  showExecutorsDictionary() {
    console.log("showExecutorsDictionary");
    this.navCtrl.push(ListDictionaryPage, {"dictionary": this.dictionaryService.getExecutors()});
  }

  showIncomeTypesDictionary() {
    console.log("showIncomeTypesDictionary");
    this.navCtrl.push(ListDictionaryPage, {"dictionary": this.dictionaryService.getIncomeTypes()});
  }

  downloadDictionaries() {
    console.log("downloadDictionaries");
    //this.overridePlansDictionary();
  }

  private overridePlansDictionary() {
    console.log("overridePlansDictionary");
    let loader = this.getLoaderSynchPopUp('Pozycje planów');
    loader.present();
    let url = this.storageService.createGetDictionaryUrl('plans')
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("start calling synchronize http");
    this.http.get(url,{headers: headers})
      .map((res: Response) => res.json())
      .subscribe(data => {
          console.log("result :" + data);
          this.dictionaryService.setPlans(data.values);
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
  }

  private getLoaderSynchPopUp(dictionaryName) {
    let loader = this.loadingCtrl.create({
      content: "Komunikacja z serwerem pobieranie słownika " + dictionaryName
    });
    return loader;
  }

  private showErrorPopUp() {
    let alert = this.alertController.create({
      title: 'Error',
      subTitle: 'Komunikacja z serwerem zakończona niepowodzeniem',
      buttons: ['Kontynuj']
    });
    alert.present();
  }

}

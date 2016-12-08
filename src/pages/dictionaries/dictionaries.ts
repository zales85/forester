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

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.storageService.getExecutorsDictionaryPromise().then((val) => {
      if(val) {
        console.log('setting executors from store');
        this.dictionaryService.setExecutors(val);
      }
    });
    this.storageService.getPlansDictionaryPromise().then((val) => {
      if(val) {
        console.log('setting plans from store');
        this.dictionaryService.setPlans(val);
      }
    });
    this.storageService.getIncomeTypesDictionaryPromise().then((val) => {
      if(val) {
        console.log('setting income types from store');
        this.dictionaryService.setIncomeTypes(val);
      }
    });
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
    this.overridePlansDictionary();
  }

  private createDictionaryFromData(data) {
    var values = [];
    console.log("createDictionaryFromData start");
    for (let row of data) {
      values.push({id:row[0], name:row[1]});
    }
    console.log("createDictionaryFromData :" + values);
    return values;
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
          var dictionary = this.createDictionaryFromData(data.values);
          console.log("dictionary :" + dictionary);
          this.dictionaryService.setPlans(dictionary);
          this.storageService.savePlansDictionary(dictionary);
          loader.dismiss();
          this.overrideExecutorsDictionary();
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

  private overrideExecutorsDictionary() {
    console.log("overrideExecutorsDictionary");
    let loader = this.getLoaderSynchPopUp('Wykonawcy');
    loader.present();
    let url = this.storageService.createGetDictionaryUrl('executors')
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("start calling synchronize http");
    this.http.get(url,{headers: headers})
      .map((res: Response) => res.json())
      .subscribe(data => {
          console.log("result :" + data);
          var dictionary = this.createDictionaryFromData(data.values);
          this.dictionaryService.setExecutors(dictionary);
          this.storageService.saveExecutorsDictionary(dictionary);
          loader.dismiss();
          this.overrideIncomeTypesDictionary();
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

  private overrideIncomeTypesDictionary() {
    console.log("overrideIncomeTypesDictionary");
    let loader = this.getLoaderSynchPopUp('Typy przychodów');
    loader.present();
    let url = this.storageService.createGetDictionaryUrl('income')
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("start calling synchronize http");
    this.http.get(url,{headers: headers})
      .map((res: Response) => res.json())
      .subscribe(data => {
          console.log("result :" + data);
          var dictionary = this.createDictionaryFromData(data.values);
          this.dictionaryService.setIncomeTypes(dictionary);
          this.storageService.saveIncomeTypesDictionary(dictionary);
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

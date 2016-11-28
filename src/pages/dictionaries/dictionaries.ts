import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {DictionaryService} from "../../services/DictionaryService";
import { ListDictionaryPage } from '../listDictionary/listDictionary';

@Component({
  selector: 'page-dictionaries',
  templateUrl: 'dictionaries.html'
})
export class DictionariesPage {

  constructor(public navCtrl: NavController, public dictionaryService: DictionaryService) {

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

}

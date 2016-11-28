import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-listDictionary',
  templateUrl: 'listDictionary.html'
})
export class ListDictionaryPage {
  public dictionary:any;
  constructor(public navCtrl: NavController, public params:NavParams) {
    this.dictionary = params.get("dictionary");
  }

}

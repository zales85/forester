import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {DictionaryService} from "../../services/DictionaryService";

@Component({
  selector: 'page-dictionaries',
  templateUrl: 'dictionaries.html'
})
export class DictionariesPage {

  constructor(public navCtrl: NavController, public dictionaryService: DictionaryService) {

  }

}

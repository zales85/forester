import { Component } from '@angular/core';

import { NavController, NavParams} from 'ionic-angular';

import {DictionaryService} from "../../services/DictionaryService";
import { StorageService } from '../../services/StorageService';


@Component({
  selector: 'page-addRod',
  templateUrl: 'addRod.html'
})

export class AddRodPage {

  rod;

  submitted = false;

  constructor(public navCtrl: NavController, public params:NavParams,
              public storageService: StorageService, public dictionaryService: DictionaryService) {
    var rodNumber = params.get("rodNumber");
    this.rod = storageService.createNewRod(rodNumber);
  }

  cancel() {
    console.log("cancel");
    this.navCtrl.pop();
  }

  save(form) {
    this.submitted = true;
    if(form.form.valid) {
      console.log('new value', this.rod);
      this.storageService.saveRod(this.rod);
      this.navCtrl.pop();
    }
  }

}

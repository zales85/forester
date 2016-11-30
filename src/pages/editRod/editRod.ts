import { Component } from '@angular/core';

import { NavController, NavParams} from 'ionic-angular';

import {DictionaryService} from "../../services/DictionaryService";
import { StorageService } from '../../services/StorageService';


@Component({
  selector: 'page-editRod',
  templateUrl: 'editRod.html'
})

export class EditRodPage {

  rod = {};

  submitted = false;

  constructor(public navCtrl: NavController, public params:NavParams, public storageService: StorageService, public dictionaryService: DictionaryService) {
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
      console.log('new value',form.value);
      this.storageService.saveRod(form.value);
      this.navCtrl.pop();
    }
  }

}

import { Component } from '@angular/core';

import { NavController, NavParams} from 'ionic-angular';

import {DictionaryService} from "../../services/DictionaryService";
import { StorageService } from '../../services/StorageService';


@Component({
  selector: 'page-editRod',
  templateUrl: 'editRod.html'
})

export class EditRodPage {

  rod;

  submitted = false;

  constructor(public navCtrl: NavController, public params:NavParams,
              public storageService: StorageService, public dictionaryService: DictionaryService) {
    this.rod = params.get("rod");
  }

  cancel() {
    console.log("cancel");
    this.navCtrl.pop();
  }

  save(form) {
    this.submitted = true;
    if(form.form.valid) {
      this.rod['estimated']=true;
      console.log('update value', this.rod);
      this.storageService.saveRod(this.rod);
      this.navCtrl.pop();
    }
  }

}

import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {DictionaryService} from "../../services/DictionaryService";
import { StorageService } from '../../services/StorageService';


@Component({
  selector: 'page-editRod',
  templateUrl: 'editRod.html'
})

export class EditRodPage {

  rod = {};

  submitted = false;

  constructor(public navCtrl: NavController, public storageService: StorageService, public dictionaryService: DictionaryService) {
    this.rod = storageService.createNewRod();
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
      // this.storage.get('rodsStore').then((val) => {
      //   if(val) {
      //     console.log('Your rodsStore length is', val.length);
      //     console.log('Your rodsStore are', val);
      //   } else {
      //     console.log('Your rodsStore empty ');
      //     val = [];
      //   }
      //   val.push(this.rod);
      //   this.storage.set('rodsStore', val);
      // })


      //this.allRods.push(this.rod);
      //this.storage.set('rodsStore', this.allRods);
      this.navCtrl.pop();
    }
  }

}

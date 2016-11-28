import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import {DictionaryService} from "../../services/DictionaryService";


@Component({
  selector: 'page-editRod',
  templateUrl: 'editRod.html'
})

export class EditRodPage {

  rod = {
        id: -1,
        documentNumber: '',
        creationDate: '2015-05-05',
        planPosition: '',
        direction: '',
        executor: '',
        synchronized: 'false'
  };

  allRods = [];

  submitted = false;

  constructor(public navCtrl: NavController, public storage: Storage, public dictionaryService: DictionaryService) {
  }

  ngOnInit() {
    console.log('init ');
     this.storage.get('rodsStore').then((val) => {
       console.log('Your rodsStore are', val);
       if(val) {
        console.log('Your rodsStore length is', val.length);
          this.allRods = val;
       }
     })
  }

  cancel() {
    console.log("cancel");
    this.navCtrl.pop();
  }

  save(form) {
    this.submitted = true;
    if(form.form.valid) {
      console.log('new value',form.value);
      this.rod.id = this.allRods.length + 1
      this.allRods.push(this.rod);
      this.storage.set('rodsStore', this.allRods);
      this.navCtrl.pop();
    }
  }

}

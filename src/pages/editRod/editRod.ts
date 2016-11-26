import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-editRod',
  templateUrl: 'editRod.html'
})

export class EditRodPage {

  rod = {
        documentNumber: '',
        creationDate: '',
        planPosition: '',
        direction: '',
        executor: ''
  };

  constructor(public navCtrl: NavController) {

  }

  ionViewLoaded() {
  }

  cancel() {
    console.log("cancel");
    this.navCtrl.pop();
  }

  save(form) {
    console.log(form.value);
    this.navCtrl.pop();
  }

}

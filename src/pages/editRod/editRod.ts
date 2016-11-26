import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-editRod',
  templateUrl: 'editRod.html'
})

export class EditRodPage {

  rod = {
        documentNumber: '',
        creationDate: '2015-05-05',
        planPosition: '',
        direction: '',
        executor: ''
  };

  submitted = false;

  constructor(public navCtrl: NavController) {

  }

  ionViewLoaded() {
  }

  cancel() {
    console.log("cancel");
    this.navCtrl.pop();
  }

  save(form) {
    this.submitted = true;
    if(form.form.valid) {
      console.log(form.value);
      this.navCtrl.pop();
    }
  }

}

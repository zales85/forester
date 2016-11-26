import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-listRod',
  templateUrl: 'listRod.html'
})
export class ListRodPage {

  constructor(public navCtrl: NavController) {

  }

  addNewRod() {
    console.log("addNewRod");
    //this.navCtrl.push(EditRodPage);
  }

  editRod() {
    console.log("editRod");
    //this.navCtrl.push(EditRodPage);
  }
}

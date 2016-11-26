import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ListRodPage } from '../listRod/listRod';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToListRod() {
    console.log("goToListRod");
    this.navCtrl.push(ListRodPage);
  }

}

import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { EditRodPage } from '../editRod/editRod';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-listRod',
  templateUrl: 'listRod.html'
})
export class ListRodPage {

  allRods = [];

  constructor(public navCtrl: NavController, private storage: Storage) {

  }

  addNewRod() {
    console.log("addNewRod");
    this.navCtrl.push(EditRodPage);
  }

  editRod() {
    console.log("editRod");
    this.navCtrl.push(EditRodPage);
  }

  ngOnInit() {
    console.log('empty init ListRodPage');
  }

  reloadRods() {
     this.storage.get('rodsStore').then((val) => {
       console.log('Your rodsStore are', val);
       if(val) {
        console.log('Your rodsStore length is', val.length);
          this.allRods = val;
       }
     })
  }

  ionViewDidEnter() {
     console.log('ionViewDidEnter');
     this.reloadRods();
  }

}

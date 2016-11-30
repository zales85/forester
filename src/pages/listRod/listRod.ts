import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { EditRodPage } from '../editRod/editRod';

import { StorageService } from '../../services/StorageService';

@Component({
  selector: 'page-listRod',
  templateUrl: 'listRod.html'
})
export class ListRodPage {

  allRods = [];

  constructor(public navCtrl: NavController, private storageService: StorageService) {

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
    this.reloadRods();
  }

  reloadRods() {
     this.storageService.getAllRodsPromise().then((val) => {
       this.allRods = val;
     })
  }



  ionViewDidEnter() {
     console.log('ionViewDidEnter');
     this.reloadRods();
  }

}

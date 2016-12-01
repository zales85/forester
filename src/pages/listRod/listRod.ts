import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { EditRodPage } from '../editRod/editRod';

import { AddRodPage } from '../addRod/addRod';

import { StorageService } from '../../services/StorageService';

import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-listRod',
  templateUrl: 'listRod.html'
})
export class ListRodPage {

  allRods = [];
  counter = 0;

  constructor(public navCtrl: NavController,
              private storageService: StorageService,
              public alertCtrl: AlertController) {

  }

  addNewRod() {
    console.log("addNewRod");
    this.navCtrl.push(AddRodPage, {"rodNumber": this.counter+1});
  }

  editRod(rod) {
    console.log("editRod");
    this.navCtrl.push(EditRodPage, {"rod": rod});
  }

  ngOnInit() {
    console.log('empty init ListRodPage');
    this.reloadRods();
  }

  reloadRods() {
     this.storageService.getAllRodsPromise().then((val) => {
       if(val) {
         this.allRods =  Array.from(val.rods.values());
         this.counter = val.counter;
       }
     })
  }

  ionViewDidEnter() {
     console.log('ionViewDidEnter');
     this.reloadRods();
  }

  showAlertBeforeSync() {
    let alert = this.alertCtrl.create({
      title: 'Satus',
      subTitle: 'ROD oczekuje na synchronizację magazynu',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertAfterSync() {
    let alert = this.alertCtrl.create({
      title: 'Satus',
      subTitle: 'ROD przesłany do magazynu',
      buttons: ['OK']
    });
    alert.present();
  }

}

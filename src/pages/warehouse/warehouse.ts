import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { StorageService } from '../../services/StorageService';

import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-warehouse',
  templateUrl: 'warehouse.html'
})
export class WarehousePage {

  allRods = [];

  constructor(public navCtrl: NavController,
              private storageService: StorageService,
              public alertCtrl: AlertController) {

  }

  ngOnInit() {
    console.log('empty init ListRodPage');
    this.reloadRods();
  }

  reloadRods() {
     this.storageService.getAllRodsPromise().then((val) => {
       if(val) {
         this.allRods =  Array.from(val.rods.values()).filter(this.isSynchronized);
       }
     })
  }

  isSynchronized(element, index, array) {
    return element['synchronized'];
  }

  ionViewDidEnter() {
     console.log('ionViewDidEnter');
     this.reloadRods();
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

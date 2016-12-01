import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ListRodPage } from '../listRod/listRod';

import { DictionariesPage } from '../dictionaries/dictionaries';

import { WarehousePage } from '../warehouse/warehouse';

import { StorageService } from '../../services/StorageService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private storageService: StorageService) {

  }

  goToListRod() {
    console.log("goToListRod");
    this.navCtrl.push(ListRodPage);
  }

  goToDictionaries() {
    console.log("goToDictionaries");
    this.navCtrl.push(DictionariesPage);
  }

  goToWarehouse() {
    console.log("goToWarehouse");
    this.navCtrl.push(WarehousePage);
  }

  synchronizeWithWarehouse() {
    console.log("synchronizeWithWarehouse");
    this.storageService.synchronizeAllRods();
  }

}

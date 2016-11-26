import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ListRod page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list-rod',
  templateUrl: 'list-rod.html'
})
export class ListRodPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ListRodPage Page');
  }

}

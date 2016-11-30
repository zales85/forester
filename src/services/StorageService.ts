import {Injectable} from "@angular/core";
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {

  constructor(private storage: Storage) {
  }

  getAllRodsPromise() {
    return this.storage.get('rodsStore');
  }

  createNewRod(rodNumber) {
    let currentDate = new Date();
    var dateValue =  currentDate.getFullYear()+ "-" + ("0" +(currentDate.getMonth() + 1)).slice(-2) + "-" +("0" + currentDate.getDate()).slice(-2);
    console.log('dateValue:', dateValue);
    return {
      id: currentDate.getTime(),
      documentNumber: 'ROD-' + rodNumber + "-" + dateValue,
      creationDate: dateValue,
      planPosition: '',
      direction: '',
      executor: '',
      synchronized: 'false',
      finished: 'false'
    };
  }

  saveRod(rod) {
    this.storage.get('rodsStore').then((val) => {
      if(val) {
        console.log('Retrieved rods', val);
      } else {
        console.log('Your rodsStore empty ');
        val = {counter:0, rods:[]};
      }
      val.counter ++;
      val.rods.push(rod);
      console.log('Saving rods', val);
      this.storage.set('rodsStore', val);
    })
  }

}

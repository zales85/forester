import {Injectable} from "@angular/core";
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {

  constructor(private storage: Storage) {
  }

  getAllRodsPromise() {
    return this.storage.get('rodsStore');
  }

  createNewRod() {
    let currentDate = new Date();
    var dateValue =  currentDate.getFullYear()+ "-" + (currentDate.getMonth() + 1) + "-" +currentDate.getDate();
    console.log('dateValue:', dateValue);
    return {
      id: currentDate.getTime(),
      documentNumber: 'Fake number',
      creationDate: dateValue,
      planPosition: '',
      direction: '',
      executor: '',
      synchronized: 'false'
    };
  }

  saveRod(rod) {
    this.storage.get('rodsStore').then((val) => {
      if(val) {
        console.log('Retrieved rods', val);
      } else {
        console.log('Your rodsStore empty ');
        val = [];
      }
      val.push(rod);
      console.log('Saving rods', val);
      this.storage.set('rodsStore', val);
    })
  }

}

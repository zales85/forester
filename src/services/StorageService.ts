import {Injectable} from "@angular/core";
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {

  private SHEET_ID = "1-TOYu4saj8-Rc96uDcS_iG2w99SjsK75zDP7S_HPtXI";

  private API_KEY = "AIzaSyB8f7ZnSjnsyZiZ4DzIMcwPY-Hl6HKxJqw";

  constructor(private storage: Storage) {
  }

  getAllRodsPromise() {
    return this.storage.get('rodsStore');
  }

  createNewRod(rodNumber) {
    let dateValue = this.createDocumentCreationDate();
    return {
      id: rodNumber,
      documentNumber: 'ROD-' + rodNumber + "-" + dateValue,
      creationDate: dateValue,
      planPosition: '',
      direction: '',
      executor: '',
      synchronized: false,
      estimated: false,
      width: 0,
      height: 0
    };
  }

  private createDocumentCreationDate() {
    let currentDate = new Date();
    return currentDate.getFullYear() + "-"
           + ("0" + (currentDate.getMonth() + 1)).slice(-2) + "-"
           + ("0" + currentDate.getDate()).slice(-2);
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
      console.log('saveRod Saving id:', rod.id);
      console.log('saveRod Saving value:', rod);
      val.rods = this.replaceRodInArray(rod, val.rods);
      console.log('saveRod Saving rods', val);
      console.log('saveRod Saving rods stringify', JSON.stringify(val));
      this.storage.set('rodsStore', val);
    })
  }

  markRodsAsSynchronized(rodsToSynchronized) {
    this.storage.get('rodsStore').then((val) => {
      if(val) {
        for (let entry of rodsToSynchronized) {
          entry['synchronized'] = true;
          val.rods = this.replaceRodInArray(entry, val.rods);
        }
        console.log('markRodsAsSynchronized Saving rods', val);
        console.log('markRodsAsSynchronized Saving rods stringify', JSON.stringify(val));
        this.storage.set('rodsStore', val);
      } else {
        console.log('markRodsAsSynchronized SKIPPED', val);
      }
    })
  }


  private replaceRodInArray(rod, rodArray) {
    var newRodArray = [];
    var replaced = false;
    for (let entry of rodArray) {
      if(entry['id'] == rod['id']) {
        newRodArray.push(rod);
        replaced = true;
      } else {
        newRodArray.push(entry);
      }
    }
    if(!replaced) {
      newRodArray.push(rod);
    }
    return newRodArray;
  }

  synchronizeAllRods() {
    // this.storage.get('rodsStore').then((val) => {
    //   if(val) {
    //     console.log('Sync retrieved rods', val);
    //     val.rods.forEach((value, key, map) =>{
    //       if(value['estimated'] && !value['synchronized']) {
    //         value['synchronized'] = true;
    //       }
    //     })
    //     this.storage.set('rodsStore', val);
    //     console.log('Sync saved rods', val);
    //   } else {
    //     console.log('Sync your rodsStore empty ');
    //   }
    // })
  }

  createRefreshTokenUrl() {
    return "https://www.googleapis.com/oauth2/v4/token";
  }

  createRefreshTokenBody() {
    return "client_id=269902140899-70iub82anpgeedh46mcrltevgobrnpv4.apps.googleusercontent.com&client_secret=BRV9r__L0ZjaCJ4i8lK44zDS&refresh_token=1/6uH3SZk6w0N0cEsQeZ1MJXw7CXsMzVZG8cpCSeBka88&grant_type=refresh_token";
  }

  createUpdateUrl(rods) {
    return "https://sheets.googleapis.com/v4/spreadsheets/"+this.SHEET_ID+"/values/data!A1:J"+rods.length+"?valueInputOption=USER_ENTERED";
  }

  createGetDictionaryUrl(dictionary) {
    return "https://sheets.googleapis.com/v4/spreadsheets/1-TOYu4saj8-Rc96uDcS_iG2w99SjsK75zDP7S_HPtXI/values/"+dictionary+"!A1:B5?key=AIzaSyB8f7ZnSjnsyZiZ4DzIMcwPY-Hl6HKxJqw";
  }

  createUpdateBody(rods) {
    console.log("createUpdateValues " + rods);
    let range = "data!A1:J"+rods.length;
    let values = this.createUpdateValues(rods);
    return {
      "range": range,
      "majorDimension": "ROWS",
      "values": values
    };
  }

  private createUpdateValues(rods) {
    var values = [];
    console.log("createUpdateValues start");
    for (let rod of rods) {
      var row = [];
      console.log("new row");
      for(var property in rod) {
        console.log('value: ' + rod[property]);
        row.push(rod[property]);
      }
      values.push(row);
    }
    console.log("createUpdateValues :" + values);
    return values;
  }

}

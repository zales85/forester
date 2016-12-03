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
        val = {counter:0, rods:new Map()};
      }
      val.counter ++;
      console.log('Saving map id:', rod.id);
      console.log('Saving map value:', rod);
      val.rods.set(rod.id, rod);
      console.log('Saving rods', val);
      this.storage.set('rodsStore', val);
    })
  }

  synchronizeAllRods() {
    this.storage.get('rodsStore').then((val) => {
      if(val) {
        console.log('Sync retrieved rods', val);
        val.rods.forEach((value, key, map) =>{
          if(value['estimated'] && !value['synchronized']) {
            value['synchronized'] = true;
          }
        })
        this.storage.set('rodsStore', val);
        console.log('Sync saved rods', val);
      } else {
        console.log('Sync your rodsStore empty ');
      }
    })
  }

  createUpdateUrl(rods) {
    return "https://sheets.googleapis.com/v4/spreadsheets/"+this.SHEET_ID+"/values/data!A1:J?valueInputOption=USER_ENTERED&key="+this.API_KEY;
  }

  createUpdateBody(rods) {
    let range = "data!A1:J"+rods.values.length;
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
    rods.forEach((value, key, map) =>{
      var row = [];
      console.log("new row");
      for(var property in value) {
        console.log('value: ' + value[property]);
        row.push(value[property]);
      }
      values.push(row);
    })
    console.log("createUpdateValues :" + values);
    return values;
  }

}

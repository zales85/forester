import {Injectable} from "@angular/core";
@Injectable()
export class DictionaryService {

  INCOME_TYPES =[{name: 'PSC'},{name:'SVK'}];

  EXECUTORS = [{name: 'Jan Kowlaski'},{name: 'Piotr Nowak'},{name : 'Wacek Bąk'},{name: 'Jurek Mak'}];

  PLANS = [{id:'PL-KW1-2016', name: 'Plan kwartalny nr 1 2016'},{id:'PL-KW2-2016', name: 'Plan kwartalny nr 2 2016'},{id:'PL-KW3-2016', name: 'Plan kwartalny nr 3 2016'}];

  getExecutors() { return this.EXECUTORS;  }

  getIncomeTypes() { return this.INCOME_TYPES; }

  getPlans() { return this.PLANS; }

}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var DictionaryService = (function () {
    function DictionaryService() {
        this.INCOME_TYPES = [{ name: 'PSC' }, { name: 'SVK' }];
        this.EXECUTORS = [{ name: 'Jan Kowlaski' }, { name: 'Piotr Nowak' }, { name: 'Wacek Bąk' }, { name: 'Jurek Mak' }];
        this.PLANS = [{ id: 'PL-KW1-2016', name: 'Plan kwartalny nr 1 2016' }, { id: 'PL-KW2-2016', name: 'Plan kwartalny nr 2 2016' }, { id: 'PL-KW3-2016', name: 'Plan kwartalny nr 3 2016' }];
    }
    DictionaryService.prototype.getExecutors = function () { return this.EXECUTORS; };
    DictionaryService.prototype.getIncomeTypes = function () { return this.INCOME_TYPES; };
    DictionaryService.prototype.getPlans = function () { return this.PLANS; };
    DictionaryService = __decorate([
        core_1.Injectable()
    ], DictionaryService);
    return DictionaryService;
}());
exports.DictionaryService = DictionaryService;

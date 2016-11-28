"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var EditRodPage = (function () {
    function EditRodPage(navCtrl, storage, dictionaryService) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.dictionaryService = dictionaryService;
        this.rod = {
            id: -1,
            documentNumber: '',
            creationDate: '2015-05-05',
            planPosition: '',
            direction: '',
            executor: '',
            synchronized: 'false'
        };
        this.allRods = [];
        this.submitted = false;
    }
    EditRodPage.prototype.ngOnInit = function () {
        var _this = this;
        console.log('init ');
        this.storage.get('rodsStore').then(function (val) {
            console.log('Your rodsStore are', val);
            if (val) {
                console.log('Your rodsStore length is', val.length);
                _this.allRods = val;
            }
        });
    };
    EditRodPage.prototype.cancel = function () {
        console.log("cancel");
        this.navCtrl.pop();
    };
    EditRodPage.prototype.save = function (form) {
        this.submitted = true;
        if (form.form.valid) {
            console.log('new value', form.value);
            this.rod.id = this.allRods.length + 1;
            this.allRods.push(this.rod);
            this.storage.set('rodsStore', this.allRods);
            this.navCtrl.pop();
        }
    };
    EditRodPage = __decorate([
        core_1.Component({
            selector: 'page-editRod',
            templateUrl: 'editRod.html'
        })
    ], EditRodPage);
    return EditRodPage;
}());
exports.EditRodPage = EditRodPage;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var editRod_1 = require('../editRod/editRod');
var ListRodPage = (function () {
    function ListRodPage(navCtrl, storage) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.allRods = [];
    }
    ListRodPage.prototype.addNewRod = function () {
        console.log("addNewRod");
        this.navCtrl.push(editRod_1.EditRodPage);
    };
    ListRodPage.prototype.editRod = function () {
        console.log("editRod");
        this.navCtrl.push(editRod_1.EditRodPage);
    };
    ListRodPage.prototype.ngOnInit = function () {
        console.log('empty init ListRodPage');
    };
    ListRodPage.prototype.reloadRods = function () {
        var _this = this;
        this.storage.get('rodsStore').then(function (val) {
            console.log('Your rodsStore are', val);
            if (val) {
                console.log('Your rodsStore length is', val.length);
                _this.allRods = val;
            }
        });
    };
    ListRodPage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidEnter');
        this.reloadRods();
    };
    ListRodPage = __decorate([
        core_1.Component({
            selector: 'page-listRod',
            templateUrl: 'listRod.html'
        })
    ], ListRodPage);
    return ListRodPage;
}());
exports.ListRodPage = ListRodPage;

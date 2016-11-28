"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var app_component_1 = require('./app.component');
var about_1 = require('../pages/about/about');
var home_1 = require('../pages/home/home');
var tabs_1 = require('../pages/tabs/tabs');
var listRod_1 = require('../pages/listRod/listRod');
var editRod_1 = require('../pages/editRod/editRod');
var storage_1 = require('@ionic/storage');
var dictionaries_1 = require('../pages/dictionaries/dictionaries');
var DictionaryService_1 = require('../services/DictionaryService');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.MyApp,
                about_1.AboutPage,
                home_1.HomePage,
                listRod_1.ListRodPage,
                editRod_1.EditRodPage,
                tabs_1.TabsPage,
                dictionaries_1.DictionariesPage,
                DictionaryService_1.DictionaryService
            ],
            imports: [
                ionic_angular_1.IonicModule.forRoot(app_component_1.MyApp)
            ],
            bootstrap: [ionic_angular_1.IonicApp],
            entryComponents: [
                app_component_1.MyApp,
                about_1.AboutPage,
                home_1.HomePage,
                listRod_1.ListRodPage,
                editRod_1.EditRodPage,
                tabs_1.TabsPage,
                dictionaries_1.DictionariesPage,
                DictionaryService_1.DictionaryService
            ],
            providers: [{ provide: core_1.ErrorHandler, useClass: ionic_angular_1.IonicErrorHandler }, storage_1.Storage]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

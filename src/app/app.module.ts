import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ListRodPage } from '../pages/listRod/listRod';
import { EditRodPage } from '../pages/editRod/editRod';
import { Storage } from '@ionic/storage';
import { DictionariesPage } from '../pages/dictionaries/dictionaries';
import { DictionaryService } from '../services/DictionaryService';
import { ListDictionaryPage } from '../pages/listDictionary/listDictionary';
import { StorageService } from '../services/StorageService';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    ListRodPage,
    EditRodPage,
    TabsPage,
    DictionariesPage,
    ListDictionaryPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    ListRodPage,
    EditRodPage,
    TabsPage,
    DictionariesPage,
    ListDictionaryPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage, DictionaryService, StorageService]
})
export class AppModule {}

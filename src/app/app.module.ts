import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { WeddingPictures } from './app.component';
import { HttpModule } from '@angular/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Camera } from '@ionic-native/camera';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryPhotoDataService } from '../network/in-memory-photo-data.service';

import { PhotoOverviewPage } from '../pages/photo-overview/photo-overview.component';
import { PhotoService } from '../services/photo.service';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { ModalPhotoPage } from '../pages/modal-photo/modal-photo';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



@NgModule({
  declarations: [
    WeddingPictures,
    PhotoOverviewPage,
    ItemDetailsPage,
    ModalPhotoPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(WeddingPictures),
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryPhotoDataService)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    WeddingPictures,
    PhotoOverviewPage,
    ItemDetailsPage,
    ListPage,
    ModalPhotoPage
  ],
  providers: [
    Camera,
    PhotoService,
    StatusBar,
    SocialSharing,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }

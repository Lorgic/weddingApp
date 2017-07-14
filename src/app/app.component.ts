import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { PhotoOverviewPage } from '../pages/photo-overview/photo-overview.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from "firebase";

@Component({
  templateUrl: 'app.html'
})
export class WeddingPictures {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = PhotoOverviewPage;
  auth;
  database;
  storage;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Bruiloft', component: PhotoOverviewPage }
    ];
  }

  initializeApp() {
    this.initFireBase();
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();

    });
  }

  initFireBase() {
    // Initialize Firebase

    var config = {
      apiKey: "AIzaSyBlQXOs_j3vWfQJOwj8Ky0uaLEmJK14ClI",
      authDomain: "weddingapp-173009.firebaseapp.com",
      databaseURL: "https://weddingapp-173009.firebaseio.com",
      projectId: "weddingapp-173009",
      storageBucket: "weddingapp-173009.appspot.com",
      messagingSenderId: "898788279142"
    };
    firebase.initializeApp(config);
    console.log("firebase init fired");


  }


  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

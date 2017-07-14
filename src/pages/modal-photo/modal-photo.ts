import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';
/**
 * Generated class for the ModalPhotoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-photo',
  templateUrl: 'modal-photo.html',
  animations: [
    trigger('fade', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0.1
      })),
      transition('invisible <=> visible', animate('200ms linear'))
    ]),
  ]
})
export class ModalPhotoPage {
  photo = {};
  imageIsLoaded = false;
  fadeState = 'invisible';
  constructor(private photoService: PhotoService, public viewCtrl: ViewController, public params: NavParams, private sharingVar: SocialSharing) {
  }

  sharePhoto(photo) {
    var photoUrl = "www" + photo.url.substring(1);
    this.sharingVar.share(photo.title, null, photoUrl, null).then(() => { console.log("sharesuccess") });
  }
  ngOnInit(): void {
    this.photoService.getPhoto(+this.params.get('photoID'))
      .then(photo => {
        console.log(photo);
        this.photo = photo;
        this.imageIsLoaded = true;
        this.fadeState = 'visible';
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}


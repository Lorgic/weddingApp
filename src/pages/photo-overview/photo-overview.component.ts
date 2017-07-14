import { Component } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { Photo } from '../../objects/photo';
import { ModalPhotoPage } from '../modal-photo/modal-photo'
import { ModalController, AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { orderBy } from "lodash";
import * as firebase from 'firebase';

@Component({
  selector: 'page-photo-overview',
  templateUrl: 'photo-overview.component.html',
})
export class PhotoOverviewPage {
  photos: Photo[] = [];
  grid: Array<Photo[]>;
  public base64Image: string;
  newPhotoTitle: string;



  constructor(public alertCtrl: AlertController, private photoService: PhotoService,
    public modalCtrl: ModalController, private camera: Camera, ) {


  }

  showPromptAddTitle() {
    let prompt = this.alertCtrl.create({
      title: 'Titel',
      message: "Beschrijf je foto in 3 woorden",
      inputs: [
        {
          name: 'title',
          placeholder: 'Titel'
        },
      ],
      buttons: [
        {
          text: 'Skip',
          handler: data => {
            this.savePhoto(this.base64Image, "");
          }
        },
        {
          text: 'Save',
          handler: data => {

            this.savePhoto(this.base64Image, data.title);
          }
        }
      ]
    });
    prompt.present();
  }

  savePhoto(base64Image: string, title: string) {
    var photo: Photo = { id: this.photos.length, title: title, url: base64Image, timestamp: Date.now() };
    this.photoService.savePhoto(photo).then(() => {
      this.addPhotosToView();

    });
  }
  addPhotosToView() {
    this.photoService.getPhotos().then(photos => {
      this.photos = photos;
      console.log(this.photos);
      this.grid = this.getGridPhotos(this.photos, 3);
      photos = orderBy(photos, ['timestamp'], ['desc']);


    });
  }

  getGridPhotos(photos: Photo[], columns: number): Array<Photo[]> {
    var result = Array(Math.ceil(photos.length / columns));
    let rowNum = 0; //counter to iterate over the rows in the grid
    for (let i = 0; i < photos.length; i += 2) { //iterate images
      if (photos[i + 1]) {
        result[rowNum] = Array(2);
        result[rowNum][1] = photos[i + 1];
      } else {
        result[rowNum] = Array(1);
      }
      if (photos[i].url) { //check file URI exists
        result[rowNum][0] = this.photos[i]; //insert imagw
      }

      rowNum++; //go on to the next row
    }
    return result;
  }

  openModal(photoID) {
    console.log("photo-overview:", photoID);
    let modal = this.modalCtrl.create(ModalPhotoPage, photoID);
    modal.present();
  }

  viewtype = "gallery";

  takePicture() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.showPromptAddTitle()
    }, (err) => {
      console.log(err);
    });
  }
  ngOnInit(): void {
    this.addPhotosToView();
  }

}

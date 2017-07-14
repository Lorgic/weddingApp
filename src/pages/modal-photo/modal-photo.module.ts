import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalPhotoPage } from './modal-photo';

@NgModule({
  declarations: [
    ModalPhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalPhotoPage),
  ],
  exports: [
    ModalPhotoPage
  ]
})
export class ModalPhotoPageModule {}

import { Injectable } from '@angular/core';
import { Photo } from '../objects/photo';
import 'rxjs/add/operator/toPromise';
import { Http, Headers } from '@angular/http';
import * as firebase from 'firebase';

@Injectable()
export class PhotoService {
  private photosUrl = 'api/photos';  // URL to web api
  private database;
  private storage;
  constructor(private http: Http) {
    this.database = firebase.database();
    this.storage = firebase.storage();
  }

  getPhotos(): Promise<Photo[]> {

    return this.http.get(this.photosUrl)
      .toPromise()
      .then(response => {
        var photos = response.json().data;
        for (var photoNr = 0; photoNr < photos.length; photoNr++) {
          var photo = photos[photoNr];
          console.log("new loop" + photoNr, photo)
          if (photo.cloudurl !== undefined && photo.cloudurl.startsWith('gs://')) {
            console.log("be before" + photoNr, photo);
            (function (currentPhoto, storage) {
              storage.refFromURL(currentPhoto.cloudurl).getMetadata().then((metadata) => {
                console.log("before" + photoNr, currentPhoto);
                currentPhoto.url = metadata.downloadURLs[0];
                console.log("after", currentPhoto)
              });
            })(photo, this.storage);
          }
        }
        console.log("einde loop", photos);
        return photos;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getPhoto(id: number): Promise<Photo> {
    const url = `${this.photosUrl}/${id}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Photo)
      .catch(this.handleError);
  }

  savePhoto(photo: Photo): Promise<Photo> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(this.photosUrl, JSON.stringify(photo), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);

  }


  // private headers = new Headers({ 'Content-Type': 'application/json' });

  // update(hero: Hero): Promise<Hero> {
  //   const url = `${this.heroesUrl}/${hero.id}`;
  //   return this.http
  //     .put(url, JSON.stringify(hero), { headers: this.headers })
  //     .toPromise()
  //     .then(() => hero)
  //     .catch(this.handleError);
  // }
  // delete(id: number): Promise<void> {
  //   const url = `${this.heroesUrl}/${id}`;
  //   return this.http.delete(url, { headers: this.headers })
  //     .toPromise()
  //     .then(() => null)
  //     .catch(this.handleError);
  // }
}

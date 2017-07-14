import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryPhotoDataService implements InMemoryDbService {
  createDb() {
    const photos = [
      { id: 0, title: 'Dit wil je zien', url: "./assets/img/card-saopaolo.png", cloudurl: "gs://weddingapp-173009.appspot.com/photos/livia.jpg", timestamp: 1 },
      { id: 1, title: 'Ma en Henk nieuwe huis', url: "./assets/img/huis.jpg", timestamp: 3 },
      { id: 2, title: 'Livia geeft ringen', url: "./assets/img/livia.jpg", timestamp: 2 },
      { id: 3, title: 'Ma en Henk nieuwe huis', url: "./assets/img/huis.jpg", timestamp: 5 },
      { id: 4, title: 'Livia geeft ringen', url: "./assets/img/livia.jpg", timestamp: 4 },
      { id: 5, title: 'Ma en Henk nieuwe huis', url: "./assets/img/huis.jpg", timestamp: 7 },
      { id: 6, title: 'Livia geeft ringen', url: "./assets/img/livia.jpg", timestamp: 6 },
      { id: 7, title: 'Ma en Henk nieuwe huis', url: "./assets/img/huis.jpg", timestamp: 8 },
    ];
    return { photos };
  }
}

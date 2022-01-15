import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';

@Component({
  selector: 'app-upload-music',
  templateUrl: './upload-music.component.html',
  styleUrls: ['./upload-music.component.scss']
})
export class UploadMusicComponent implements OnInit {
  selectFile: File;
  ref: AngularFireStorageReference;
  downloadURL: string;
  checkUploadMusic = false;
  @Output()
  giveURLtoCreate = new EventEmitter<string>();
  constructor(private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  onFileChangedMusic($event) {
    this.selectFile = $event.target.files[0];
    this.onUpload();
  }

  onUpload() {
    this.checkUploadMusic = true;
    const id = Math.random().toString(36).substring(2); // Tao ra 1 cai ten random tren firebase
    this.ref = this.afStorage.ref(id);
    this.ref.put(this.selectFile).then(snapshot => {// Tra ve 1 chuoi sieu van ban
      return snapshot.ref.getDownloadURL();
    }).then(downloadURL => {
      this.downloadURL = downloadURL;
      this.giveURLtoCreate.emit(this.downloadURL);
      this.checkUploadMusic = false;
      return downloadURL;
    })
      .catch(error => {
        console.log(`Failed to upload music ${error}`);
      });
  }
}

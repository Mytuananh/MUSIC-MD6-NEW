import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss']
})
export class UploadAvatarComponent implements OnInit {
  selectFile: File;
  ref: AngularFireStorageReference;
  downloadURL: string;
  checkUploadAvatar = false;
  @Output()
  giveURLtoCreate = new EventEmitter<string>();
  constructor(private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  onFileChanged($event) {
    this.selectFile = $event.target.files[0];
    this.onUpload();
  }

  onUpload() {
    this.checkUploadAvatar = true;
    const id = Math.random().toString(36).substring(2); // Tao ra 1 cai ten random tren firebase
    this.ref = this.afStorage.ref(id);
    this.ref.put(this.selectFile).then(snapshot => {// Tra ve 1 chuoi sieu van ban
      return snapshot.ref.getDownloadURL();
    }).then(downloadURL => {
      this.downloadURL = downloadURL;
      this.giveURLtoCreate.emit(this.downloadURL);
      this.checkUploadAvatar = false;
      return downloadURL;
    })
      .catch(error => {
        console.log(`Failed to upload avatar ${error}`);
      });
  }
}

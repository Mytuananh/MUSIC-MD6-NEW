import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
import {FormBuilder, Validators} from '@angular/forms';
import {SongService} from '../../../service/song.service';
import {TokenService} from '../../../service/token.service';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss']
})
export class CreatePlaylistComponent implements OnInit {
  selectedFile: File | undefined;
  ref: AngularFireStorageReference | undefined;
  downloadURL: string | undefined;
  checkUploadFile = false;
  idUser?: number;
  count = 0;
  typeFile: string | undefined;
  newList: any;
  @Output()
  giveURLtoCreate = new EventEmitter<string>();

  constructor(private afStorage: AngularFireStorage,
              private formBuilder: FormBuilder,
              private songService: SongService,
              private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.downloadURL = '';
    this.idUser = this.tokenService.getId();
  }

  onFileChanged($event: any) {
    this.selectedFile = $event.target.files[0];
    this.typeFile = this.selectedFile?.type;
    this.onUpload();
  }

  onUpload() {
    this.checkUploadFile = true;
    const id = Math.random().toString(36).substring(2);

    this.ref = this.afStorage.ref(id);
    this.ref.put(this.selectedFile).then(snapshot => {
      return snapshot.ref.getDownloadURL();
    }).then(downloadURL => {
      this.downloadURL = downloadURL;
      this.giveURLtoCreate.emit(this.downloadURL);
      this.checkUploadFile = false;
      return downloadURL;
    })
      .catch(error => {
        console.log(`Failed to get link ${error}`);
      })
  }

  public formdata = this.formBuilder.group({
    name: ['', Validators.required],
    file: ['', Validators.required],
  })

  onSubmit() {
    this.newList = {
      name: this.formdata.value.name,
      file: this.formdata.value.file,
      idUser: this.idUser
    }
    this.songService.createPlaylist(this.newList).subscribe(() => {
      alert("Tạo thành công!");
      this.formdata.reset("")
    })
  }
}

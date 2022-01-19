import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {SongService} from '../../service/song.service';
import {TokenService} from '../../service/token.service';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {
  idUser: any;
  commentList: any;
  comment: any;
  idSong: any;
  public formdata = this.formBuilder.group({
    text: ['', Validators.required],
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private songService: SongService,
              private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.idUser = this.tokenService.getId();
    this.idSong = this.data.id;
    this.getCommentList();
  }

  getCommentList(){
    this.songService.findAllComment(this.idSong).subscribe(list=>{
      this.commentList = list;
    })
  }
  onSubmit() {
    this.comment = {
      text: this.formdata.value.text,
      idUser: this.idUser,
      idSong: this.idSong
    }
    this.songService.commentSong(this.comment).subscribe(()=>{
      this.formdata.reset();
      this.getCommentList();
    })
  }
}

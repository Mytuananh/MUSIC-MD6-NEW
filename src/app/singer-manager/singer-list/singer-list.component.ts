import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import {DialogComponent} from '../../song-manager/dialog/dialog.component';
import {Singer} from '../../model/Singer';
import {SingerService} from '../../service/singer.service';

@Component({
  selector: 'app-singer-list',
  templateUrl: './singer-list.component.html',
  styleUrls: ['./singer-list.component.scss']
})
export class SingerListComponent implements OnInit {
  totalElements: any = 0;
  singers: Singer[] = [];
  loading: boolean;
  constructor(private singerService: SingerService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getListRequest({page: 0, size: 3});
  }
  private getListRequest(request) {
    this.loading = true;
    this.singerService.pageSinger(request).subscribe(data => {
      console.log('data --> ', data);
      // @ts-ignore
      this.singers = data.content;
      console.log('data[content] ---->', data.content);
      this.totalElements = data.totalElements;
      console.log('data[totalElements] == ', data.totalElements);
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  nextPage(event: PageEvent) {
    console.log('event -->', event);
    const request = {};
    // @ts-ignore
    request.page = event.pageIndex.toString();
    // @ts-ignore
    request.size = event.pageSize.toString();
    // @ts-ignore
    console.log('request[size]', request.size);
    this.getListRequest(request);
  }
  deleteSinger(id: number){
    this.singerService.deleteSingerById(id).subscribe(() => {
      this.getListRequest({page: 0, size: 3});
      window.location.reload();
    });
  }
  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.deleteSinger(id);
      }
      console.log(`Dialog result: ${result}`);
    });
  }
}

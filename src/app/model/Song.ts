export class Song {
  public id: number;
  public name: string;
  public description: string;
  public file: string;
  public singers: any;
  public musician: string;
  public avatar: string;
  public count: number;
  public countLike: number;


  // tslint:disable-next-line:max-line-length
  constructor( name: string, description: string, file: string, singers: any, musician: string, avatar: string, count: number, countLike: number) {
    this.name = name;
    this.description = description;
    this.file = file;
    this.singers = singers;
    this.musician = musician;
    this.avatar = avatar;
    this.count = count;
    this.countLike = countLike;
  }
}

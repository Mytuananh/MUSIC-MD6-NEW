export class Song {
   public id: number;
   public name: string;
   public description: string;
   public file: string;
   public singer: string;
   public musician: string;
   public count: number;
   public countLike: number;


  // tslint:disable-next-line:max-line-length
  constructor(id: number, name: string, description: string, file: string, singer: string, musician: string, count: number, countLike: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.file = file;
    this.singer = singer;
    this.musician = musician;
    this.count = count;
    this.countLike = countLike;
  }
}

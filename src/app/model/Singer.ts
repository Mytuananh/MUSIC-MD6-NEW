export class Singer {
  public name: string;
  public age: string;
  public countryside: string;
  public avatar: string;
  public songs: any;


  constructor(name: string, age: string, countryside: string, avatar: string, songs: any) {
    this.name = name;
    this.age = age;
    this.countryside = countryside;
    this.avatar = avatar;
    this.songs = songs;
  }
}

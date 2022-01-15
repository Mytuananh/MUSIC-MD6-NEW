export class Singer {
  public id: number;
  public name: string;
  public age: string;
  public countryside: string;
  public avatar: string;



  constructor(name: string, age: string, countryside: string, avatar: string) {
    this.name = name;
    this.age = age;
    this.countryside = countryside;
    this.avatar = avatar;
  }
}

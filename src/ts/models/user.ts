export default class User{
  public id : string
  public email :string
  public displayName :string
  public photoURL :string
  constructor(id: string, base:any){
    this.id = id
    this.email = base.email
    this.displayName = base.displayName
    this.photoURL = base.photoURL
  }
}
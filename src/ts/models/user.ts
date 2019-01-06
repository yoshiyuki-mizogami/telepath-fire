export default class User{
  public email :string
  public displayName :string
  public photoURL :string
  constructor(base:any){
    this.email = base.email
    this.displayName = base.displayName
    this.photoURL = base.photoURL
  }
}
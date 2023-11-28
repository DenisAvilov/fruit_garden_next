export class UserDTO{
  userId: number
  email : string
  role: string
  isActivated: boolean
    constructor(
      model:{
      id: number,
      email: string, 
      isActivated: boolean, 
      role: string}){
    this.userId = model.id
    this.email = model.email
    this.isActivated = model.isActivated   
    this.role = model.role
  }
}
export class UserDTO{
  userId: number
  email : string
  role: string
  isActivated: boolean
  activationLink: string
    constructor(
      model:{
      id: number,
      email: string, 
      isActivated: boolean, 
      role: string
      activationLink: string  
    }){
    this.userId = model.id
    this.email = model.email
    this.isActivated = model.isActivated 
    this.activationLink = model.activationLink  
    this.role = model.role
  }
}
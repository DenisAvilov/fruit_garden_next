import { BadRequestException, Injectable } from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import { ContactDto } from './dto'
import { randomInt } from 'crypto'
import { MobizonService } from './mobizon.service'

@Injectable()
export class ContactService {
  constructor(
    private db: DbService,
    private mobizon: MobizonService
    ){}
  async  createContact(userId: number): Promise<ContactDto>{
   return await this.db.contact.create({data: {userId}})
  }

  async patchContact(userId: number, body: {phone: string | null}){
    const phoneNumber = await  this.db.contact.findFirst({ where: { phone: body.phone } })
    if(phoneNumber){
      throw new BadRequestException({type: 'такий номер вже існує'})
    }
    const activationLink = this.generateActivationCode()
    const contact =  await this.db.contact.update({where: {userId: userId},
      data:{
        phone: body.phone,
        activationLink
      }})
      if(contact.phone && contact.activationLink){             
      //  await this.sendCodePhone(contact.phone, contact.activationLink)
      }    
       return { isActivated: contact.isActivated }     
      }  

  async sendCodePhone(phone: string, activationLink: string){                 
      await this.mobizon.sendSms(phone, activationLink) 
    }
 
  async patchVerifyPhone(userId: number, body:{activationLink: string}){ 
  const contact = await this.db.contact.findFirst({
        where: {id: userId}       
      })   
      
   if (contact?.activationLink !== body.activationLink){    
      throw new BadRequestException({type: 'Код активації не совпадає, перевірти сповіщення на телефоні'})
   }
  const isContact = await this.db.contact.update({
    where: {userId: userId},
    data:{
         isActivated : true
      }})
      return { isActivated: (await isContact).isActivated }   
   }

 generateActivationCode(){  
  return  randomInt(1000, 9999).toString()
 }
}

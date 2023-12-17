import {  BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'
import { DbService } from 'src/db/db.service';
// import { isAfter, parse } from 'date-fns'

@Injectable()
export class MailService {
 private transporter: any;
constructor(
  private db:DbService
){
      this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // уточнить самостоятельно
      auth:{
          user: process.env.SMPT_USER,
          pass: process.env.SMPT_PASSWORD
      }
    })
  }


  private createMailExpires() {
    return new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  }

  async sendActivationMailLink(to: string, link: string){
    await this.transporter.sendMail({
    from: process.env.SMPT_USER,
    to,
    subject: `Активація email користувача`,
    text:'',
    html:
    `
    <div>
    <h2>Активація акаунта</h2>    
    <p>Щоб завершити перейдить за поссилянням <a href="${process.env.SERVER_HREF}${link}">Давай зробимо це</a></p>
    </div>
    `

  }) 
  } 

  async activeMail(activationLink: string, session: number){
      const isValidDate = !isNaN(new Date(activationLink).getTime())
      if (!isValidDate) {
        throw new BadRequestException({type: 'Не коректний формат'})  
      }
      const activationLinkDateUTC = new Date(activationLink)      
      const user =  await this.db.user.findFirst({
       where: {activationLink},              
       });
       if(user?.isActivated === true ){
        throw new BadRequestException({type: 'Акаунт вже активован!'})        
       }
      if( 
        activationLinkDateUTC.toISOString() > new Date().toISOString()) {
        await this.db.user.update({
          where: { id: user?.id },
          data: { isActivated: true},
        });
   
   return `Email користувача ${user?.email} активован` 

  } else {
      const currentLinkDate = this.createMailExpires();  
      const patchUser = await this.db.user.update({
        where: {
          id: session
        },
        data: {
          activationLink: currentLinkDate
        }
      })    
      if(patchUser){
        this.sendActivationMailLink( patchUser?.email, currentLinkDate)
      }       
   throw new BadRequestException({type: 'Посилання не дійсна або не знайдене, ми надіслали вам на пошту нове посилання для активації акаунта. перевірте силку вона діє 24 години.'})
  }   
  
  } 
}

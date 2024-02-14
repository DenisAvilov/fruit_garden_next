import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";


export enum UserRole {
  Admin = 'ADMIN', 
  User = 'USER',
}

export class UserDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  email: string

  @ApiProperty()
  role: string
  
  @ApiProperty({ type: String, maxLength: 255 })
  hash: string

  @ApiProperty({ type: String, maxLength: 255 })
  salt: string

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isActivated: boolean 

  @ApiProperty()
  activationLink: string

  @ApiProperty()
  createdAt: string
}

export class AccountDto {
  @ApiProperty()
  id: number 

  @ApiProperty()
  userId: number 

  @ApiProperty({
  example: 'Denis'
  })
  name: string | null

  @ApiProperty({
  example: 'Avilov'
  })
  lastName: string | null

  @ApiProperty({
  example: 'https://www.google.com=images'
  })
  img: string | null


}

export class ContactDtoSW {
  @ApiProperty({example: '+380506195452'})
  phone: string | null
}

export class ContactDto {
  @ApiProperty({example: '+380506195452'})
  phone: string | null
 
  @ApiProperty({ example: false })
  @IsBoolean()
  isActivated: boolean

  @ApiProperty({ example: 'http//:link' })
  activationLink: string | null

  @ApiProperty()
  id: number

  @ApiProperty()
  userId: number

}

export class IsActivatedContactDto{
  @ApiProperty()
  @IsBoolean()
  isActivated: boolean 
} 

export class SocialDto {
  
  @ApiProperty()
  @ApiProperty({example: 'http//:fb'})
  fb: string | null

  @ApiProperty({example: 'http//:instagram'})
  instagram: string | null 

  @ApiProperty({example: 'http//:telegram'})
  telegram: string | null 

  @ApiProperty()
  id: number 

  @ApiProperty()
  userId: number 
}

export class AccountAndRoleDto{
  @ApiProperty()
  user?: UserDto;

  @ApiProperty()
  account: AccountDto | null;
} 


export class ProfileDto {
  @ApiProperty()
  user?: UserDto;

  @ApiProperty()
  account: AccountDto | null;

  @ApiProperty()
  contact: ContactDto | null;

  @ApiProperty()
  social: SocialDto | null;
}

export class PatchAccountDto {    

  @ApiProperty({example: 'Denis'})
  name: string | null

  @ApiProperty({example: 'Avilov'})
  lastName: string | null

  @ApiProperty({example: 'https://www.google.com/images'})
  @IsOptional()
  img: string  | null
}


export class PatchContactDto {
  @ApiProperty({ example: '+380506195452' })
  phone: string;   
}

export class ContactDtoSWActivate {
  @ApiProperty({ example: '1234' })
  activationLink: string;
}

export class PatchSocialDto {  

  @ApiProperty({ example: 'facebook.com/user' })
  @IsOptional()
  fb: string;

  @ApiProperty({ example: 'instagram.com/user' })
  @IsOptional()
  instagram: string;

  @ApiProperty({ example: 't.me/user' })
  @IsOptional()
  telegram: string;

 
}

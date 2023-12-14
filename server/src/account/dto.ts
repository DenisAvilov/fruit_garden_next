import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";

export class UserDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  email: string

  @ApiProperty()
  role: string
  
  @ApiProperty()
  hash: string

  @ApiProperty()
  salt: string

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isActivated: boolean
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

export class ContactDto {

  @ApiProperty({example: '+123456789'})
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
// Редоктірованіє 
export class PatchAccountDto {      
 
  @ApiProperty({
  example: 'Denis'
  })
  name: string | null

  @ApiProperty({
  example: 'Avilov'
  })
  lastName?: string | null

  @ApiProperty({
  example: 'https://www.google.com/images'
  })
  @IsOptional()
  img: string  | null
}

export class PatchContactDto {

  @ApiProperty({ example: '+123456789' })
  phone: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  isActivated: boolean;
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

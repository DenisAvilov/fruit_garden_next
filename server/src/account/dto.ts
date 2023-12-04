import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";

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
  example: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.klipartz.com%2Fru%2Fsearch%3Fq%3D%25D0%25B0%25D0%25BA%25D0%25BA%25D0%25B0%25D1%2583%25D0%25BD%25D1%2582&psig=AOvVaw0EsuC5iExubquCfWvvEzzw&ust=1701773565477000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJDnu9jO9YIDFQAAAAAdAAAAABAE'
  })
  img: string | null
}

export class ContactDto {

  @ApiProperty()
  id: number

  @ApiProperty()
  userId: number
     
  @ApiProperty({ example: '+123456789' })
  phone: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  isActivated: boolean;

  @ApiProperty({ example: 'example text' })
  @IsBoolean()
  activationLink: string;

}

export class SocialDto {
  
  @ApiProperty()
  id: number

  @ApiProperty()
  userId: number

  @ApiProperty({ example: 'facebook.com/user' })
  fb: string;

  @ApiProperty({ example: 'instagram.com/user' })
  instagram: string;

  @ApiProperty({ example: 't.me/user' })
  telegram: string;
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
  example: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.klipartz.com%2Fru%2Fsearch%3Fq%3D%25D0%25B0%25D0%25BA%25D0%25BA%25D0%25B0%25D1%2583%25D0%25BD%25D1%2582&psig=AOvVaw0EsuC5iExubquCfWvvEzzw&ust=1701773565477000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJDnu9jO9YIDFQAAAAAdAAAAABAE'
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
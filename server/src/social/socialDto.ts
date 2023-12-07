import { ApiProperty } from "@nestjs/swagger"

export class SocialDto{ 

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
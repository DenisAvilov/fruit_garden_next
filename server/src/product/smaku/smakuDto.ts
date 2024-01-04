import { ApiProperty } from "@nestjs/swagger";

export class SmaksDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
  
}
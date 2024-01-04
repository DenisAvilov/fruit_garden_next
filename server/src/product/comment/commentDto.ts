import { ApiProperty } from "@nestjs/swagger";

export class CommentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  text: string;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  parentId: number;
 
  @ApiProperty()
  createdAt: string;
}
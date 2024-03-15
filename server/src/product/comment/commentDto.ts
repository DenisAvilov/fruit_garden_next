import { ApiProperty } from "@nestjs/swagger";
import { IsArray,   IsDate,   IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CommentDto {
  @ApiProperty({description: "Індифікатор коментаря"})
  @IsNumber()
  id: number;

  @ApiProperty({description: "Текст повідомленя"})
  @IsString()
  text: string;

  @ApiProperty({description: "Індифікатор продукту"})
  @IsNumber()
  productId: number;

  @ApiProperty({description: "Індифікатор користувача"})
  @IsNumber()
  userId: number;

  @ApiProperty({description: "Індифікатор батьківського коментаря"})
  @IsNumber()
  parentId: number | null;

  @ApiProperty({ type: CommentDto, description: "Масив батьківського коментаря" }) 
  @IsArray()
  @IsOptional()
  replies?: CommentDto[];
 
  @ApiProperty({description: "Дата створення коментаря"})  
  @IsDate()
  createdAt: Date;
}

export class PostCommentDto{
  
  @ApiProperty({ example:"Дякую за вашу працю!!!",description: "Текст повідомленя"})
  @MaxLength(500)
  @IsString()
  text: string;

  @ApiProperty({example: 1, description: "Індифікатор продукту"})
  @IsNumber()
  productId: number;

   
  @ApiProperty({   description: "Дата створення коментаря"})
  @IsString()
  // @IsDate()
  createdAt: string;

}

export class  PatchCommentDto extends PostCommentDto {
  @ApiProperty({example: 1, description: "Індифікатор коментаря"})
  @IsNumber()
  id: number; 
}

export class PostSubCommentDto extends PostCommentDto {
 @ApiProperty({description: "Індифікатор батьківського коментаря"})
 @IsNumber()
 @IsOptional()
 parentId: number;  
}

export class PatchSubCommentDto extends PostCommentDto {
 @ApiProperty({description: "Індифікатор батьківського коментаря"})
 @IsNumber()
 @IsOptional()
 parentId: number;

 @ApiProperty({ type: [CommentDto], description: "Масив батьківського коментаря" }) 
 @IsArray()
 @IsOptional()
 replies: CommentDto[];
}
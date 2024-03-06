import { BadRequestException, Injectable } from '@nestjs/common';
import { GetSessionInfoDto } from 'src/auth/dto';
import { PatchCommentDto, PostCommentDto, PostSubCommentDto } from './commentDto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class CommentService {
  constructor(
    private db: DbService
  ){}

  async deleteComment(session: GetSessionInfoDto, id: number) {
  try {          
    const comment = await this.db.comment.findUnique({
      where: { id: id }
    });
    if (!comment) {
      throw new BadRequestException({ type: `Нема коментаря за індефікатором ${id}` });
    }    
    if (session.role === 'admin' || comment.userId === session.userId) {
      const deletedComment = await this.db.comment.delete({ where: { id: id } });
      return deletedComment;
    } else {
      throw new BadRequestException({ type: `Користувач може видаляти лише свої коментарі` });
    }
    
  } catch (error) {
    throw new BadRequestException({ type: error });
  }
  }

  async getComment(id?: number){
    try{  
      if(id){
      return this.db.comment.findMany({where: {
        productId: id
      }})        
    }
    }
    catch(error){
      throw new BadRequestException({type: error})
    }  
  }

  async createComment(session: GetSessionInfoDto, body: PostCommentDto){
    try{
      const product = await this.db.product.findFirst({
        where: {id: body.productId}})
      if(!product){       
        throw new BadRequestException({type: `Нема продукта за індефікатором  ${body.productId}`})
      }
       return await this.db.comment.create({
        data: {
          productId: body.productId,
          userId: session.userId,
          text: body.text,
          createdAt: body.createdAt,
         
        }
      })      
      
    }
    catch(error){
      throw new BadRequestException({type: error})
    }
  }

  async patchComment(session: GetSessionInfoDto, body: PatchCommentDto){
    try{      
      const product = await this.db.product.findFirst({
        where: {id: body.productId}})
      if(!product){       
        throw new BadRequestException({type: `Нема продукта за індефікатором  ${body.productId}`})
      }
        const comment = await this.db.comment.findUnique({
      where: { id: body.id }
    });

    if (!comment) {
      throw new BadRequestException({ type: `Нема коментаря за індефікатором ${body.id}` });
    }

    if (comment.userId !== session.userId) {
      throw new BadRequestException({ type: `Користувач не має права оновлювати цей коментар` });
    }
      const updatedComment = this.db.comment.update({ 
        where: {id: body.id},
        data: {
          text: body.text,
          createdAt: body.createdAt,          
        }
      })      
      return updatedComment
    }
    catch(error){
      throw new BadRequestException({type: error})
    }
  }
  
  async createSubComment(session: GetSessionInfoDto, body: PostSubCommentDto) {
  try {     
    const parentComment = await this.db.comment.findUnique({
      where: { id: body.parentId }
    });
    if (!parentComment) {
      throw new BadRequestException({ type: `Нема коментаря за індефікатором ${body.parentId}` });
    }    
    return await this.db.comment.create({
      data: {
        text: body.text,
        productId: parentComment.productId,
        userId: session.userId,  
        parentId: body.parentId
      }
    });

      
  } catch (error) {
    throw new BadRequestException({ type: error });
  }
  }

}

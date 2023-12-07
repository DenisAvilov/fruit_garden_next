import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { DbModule } from 'src/db/db.module';


@Module({
  imports: [DbModule],  
  providers: [ContactService, ContactService],
  exports: [ContactService]
})
export class ContactModule {}

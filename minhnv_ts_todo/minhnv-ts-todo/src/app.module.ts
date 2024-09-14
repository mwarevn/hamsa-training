import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { NoteModule } from './modules/note/note.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    NoteModule,
    MongooseModule.forRoot('mongodb://localhost:27017/ts-note'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

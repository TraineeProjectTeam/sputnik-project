import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@cluster0.5roqj5k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

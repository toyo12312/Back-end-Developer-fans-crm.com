import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Ensure the connection string is correct and the database is running
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/user-management'),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}

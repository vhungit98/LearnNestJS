import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig), // Connect database
    TasksModule // Add import module Tasks (cmd: nest g module tasks) (g:generate)
  ],
})
export class AppModule { }

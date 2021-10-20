// nest g module tasks
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller'; // Mặc định tự import sau khi dùng lệnh tạo file controller
import { TasksService } from './tasks.service'; // Mặc định tự import sau khi dùng lệnh tạo file services
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
  ],
  controllers: [TasksController], // Mặc định tự import sau khi dùng lệnh tạo file controller
  providers: [TasksService] // Mặc định tự import sau khi dùng lệnh tạo file service
})
export class TasksModule { }

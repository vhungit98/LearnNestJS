// create: nest g controller tasks --no-spec (g: generate, --no-spec: Không tạo file .spec.ts - file chứa các unit test dùng cho testing)
import { Body, Controller, Get, Param, Post, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks') // Tạo đường dẫn mặc định của module. Vd: http://localhost:3000/tasks
// tasksService = new TasksService();
// TasksController=new TasksController(tasksService,abcs);
export class TasksController {
    constructor(private tasksService: TasksService) { } // Dependency TasksService được xử lý và truyền qua hàm khởi tạo của controller để sử dụng

    @Get() // Mặc định với đường dẫn gốc của decorator @Controller('tasks')
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto);
    }

    @Get('/:id') // Bổ sung thêm thông tin vào Endpoint. Vd: http://localhost:3000/tasks/:id
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post() // Mặc định với đường dẫn gốc của decorator @Controller('tasks')
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto)
    }

    @Delete('/:id') // Bổ sung thêm thông tin vào Endpoint. Vd: http://localhost:3000/tasks/:id
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status') // Bổ sung thêm thông tin vào Endpoint. Vd: http://localhost:3000/tasks/:id/status
    updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status);
    }
}

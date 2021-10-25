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
        // @Query(): Hỗ trợ lấy các thuộc tính từ URL
        // ValidationPipe: Gọi để sử dụng với decorator validator của lib phụ thuộc bắt buộc là "class-validator" từ class GetTasksFilterDto
        return this.tasksService.getTasks(filterDto);
    }

    @Get(':id') // Bổ sung thêm thông tin vào Endpoint. Vd: http://localhost:3000/tasks/:id
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        // @Param(): Hỗ trợ truy cập vào các param được khai báo động vào url, để lấy giá trị của param -> bổ sung tên param vào vào param thứ 1 của decorator, để valid param -> bổ sung class valid vào param thứ 2 của decorator
        // ParseIntPipe: valid param, bắt buộc là một số, nếu không sẽ báo lỗi và dừng lại
        return this.tasksService.getTaskById(id);
    }

    @Post() // Mặc định với đường dẫn gốc của decorator @Controller('tasks')
    @UsePipes(ValidationPipe) // ValidationPipe: Gọi để sử dụng với decorator validator của lib phụ thuộc bắt buộc là "class-validator" từ class CreateTaskDto, ValidationPipe có thể được truyền vào decorator @Body() -> @Body(ValidationPipe) để sử dụng như decorator @Query()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        // @Body(): Lấy các param gửi lên bằng giao thức @Post() để xử lý sau khi đã valid 
        return this.tasksService.createTask(createTaskDto)
    }

    @Delete('/:id') // Bổ sung thêm thông tin vào Endpoint. Vd: http://localhost:3000/tasks/:id
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        // @Param(): Hỗ trợ truy cập vào các param được khai báo động vào url, để lấy giá trị của param -> bổ sung tên param vào vào param thứ 1 của decorator, để valid param -> bổ sung class valid vào param thứ 2 của decorator
        // ParseIntPipe: valid param, bắt buộc là một số, nếu không sẽ báo lỗi và dừng lại
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status') // Bổ sung thêm thông tin vào Endpoint. Vd: http://localhost:3000/tasks/:id/status
    updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
        // @Param(): Hỗ trợ truy cập vào các param được khai báo động vào url, để lấy giá trị của param -> bổ sung tên param vào vào param thứ 1 của decorator, để valid param -> bổ sung class valid vào param thứ 2 của decorator
        // ParseIntPipe: valid param, bắt buộc là một số, nếu không sẽ báo lỗi và dừng lại
        // @Body('status', TaskStatusValidationPipe): Lấy param "status" gửi lên bằng giao thức @Post() để xử lý sau khi đã valid bằng class valid TaskStatusValidationPipe tự định nghĩa 
        return this.tasksService.updateTaskStatus(id, status);
    }
}

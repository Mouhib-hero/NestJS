import { CustompipeController } from './../todo/pipe/custompipe.controller';
import { CommonModule } from './../todo/common/common.module';
import { TodoEntity } from '../todo/todomodel.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PremierModule } from 'src/premier/premier.module';
import { PremierController } from 'src/premier/premier.controller';
import { PremierService } from 'src/premier/premier.service';

import { TodoModule } from 'todo/todo.module';
import { TodoController } from 'todo/todo.controller';
import { TodoService } from 'todo/todo.service';


@Module({
  imports: [
    CommonModule, PremierModule, TodoModule],
  controllers: [
    CustompipeController, AppController, PremierController, TodoController],
  providers: [AppService, TodoService],
})
export class AppModule { }

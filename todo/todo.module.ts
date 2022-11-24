import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntityORM } from 'src/TypeORM/entiteTypeORM/entities/TodoentityORM.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntityORM])],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}

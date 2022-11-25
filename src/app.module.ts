import { TestTypeORMController } from './TypeORM/entiteTypeORM/testtypeorm.controller';
import { TestTypeORMService } from './TypeORM/entiteTypeORM/testtypeorm.service';
import { TestTypeORMModule } from './TypeORM/entiteTypeORM/testtypeorm.module';
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
import { TypeOrmModule } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';
import { TodoEntityORM } from './TypeORM/entiteTypeORM/entities/TodoentityORM.entity';
import { CvModule } from 'cv/cv/cv.module';
import { SkillModule } from 'skill/skill/skill.module';
import { UserModule } from 'user/user/user.module';
dotenv.config()

@Module({
  imports: [
    TestTypeORMModule,
    TypeOrmModule.forFeature([TodoEntityORM]),
    CommonModule, PremierModule, TodoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'nest-exemple', //nom de la base de données à utiliser
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true, //en mode dev, toute modification qu'on fait au niveua de notre typeORM va etre directement refletee dans la BD
    }),
  CvModule,
  SkillModule,
  UserModule,
  ],
  controllers: [
    TestTypeORMController,
    CustompipeController, AppController, PremierController, TodoController],
  providers: [
    TestTypeORMService, AppService, TodoService],
})
export class AppModule { }

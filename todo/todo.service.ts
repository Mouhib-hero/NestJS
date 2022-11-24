/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TodoEntity } from './todomodel.entity';
import { TodoStatusEnum } from './todomodel.entity';

import {v4 as uuidv4} from 'uuid';
import { AddTodoDTO } from './DTO/add-todo.dto';
import { UpdateTodoDTO } from './DTO/update-todo.dto';

@Injectable()
export class TodoService {
    todos: TodoEntity[] = [];

    getTodos(): TodoEntity[] {
      return this.todos;
    }

    
    addTodo(newTodoEntity: AddTodoDTO): TodoEntity{
        //const todo = new TodoEntity();
        const {name, description} = newTodoEntity;
        //todo.name = name;
        //todo.description = description;
        let id;
        if(this.todos.length){
            //todo.id = this.todos[this.todos.length -1].id +1; //id du dernier element +1
            id = this.todos[this.todos.length -1].id +1; //id du dernier element +1
        } else{
            //todo.id = 1;
            id = 1;
        }
        //const todo = {
        /*return{
          id,
          name,
          description,
          dateCreation: new Date(),
          statut: TodoStatusEnum.waiting,
        };*/
        const todo = {
          id,
          name,
          description,
          dateCreation: new Date(),
          statut: TodoStatusEnum.waiting,
        };
        this.todos.push(todo);
        return todo;
    }
    getTodoByID(id: number){
      //on enleve le "+" avant 'id' si on met 'getTodoByID(id: number)'
        const todo = this.todos.find((actualTodo : TodoEntity) => actualTodo.id === id);
        if (todo)
            return todo;
        throw new NotFoundException(`le todo ${id} n'existe pas`);
    }
    supprimerTodo(id: number){
      // chercher le todo selon l'id
      const index = this.todos.findIndex((todo: TodoEntity) => todo.id === +id);
      // si le todo existe on le supprime
      if (index >= 0){
          this.todos.splice(index, 1);
      } else {
          throw new NotFoundException(`todo ${id} introuvable`);
      }
      return {
          message: `le todo ${id} a été supprimé`,
          count: 1 // nb element qui a été supprimé
      };
    }
    //modifierTodo(id: number, newTodo:Partial<AddTodoDTO> ){
      modifierTodo(id: number, newTodo:Partial<UpdateTodoDTO> ){ //en utilisant le DTO specifique pour l update
        const todo = this.getTodoByID(id); //chercher le todo voulu par ID
        // si newtodo.description est correct, on retourne newtodo.description
        //sinon on recupere todo.description
        //en d'autre terme (si le nouveau terme est correct on le récupere, sinon on recupere l'ancien)
        todo.description = newTodo.description? newTodo.description : todo.description;
        todo.name = newTodo.name? newTodo.name : todo.name;
        return todo; //retourner le nouveau todo qui a été modifié
    }
 }

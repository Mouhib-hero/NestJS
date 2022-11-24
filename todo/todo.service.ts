/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TodoEntity, TodoStatusEnum } from './todomodel.entity';

import {v4 as uuidv4} from 'uuid';
import { AddTodoDTO } from './DTO/add-todo.dto';
import { UpdateTodoDTO } from './DTO/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Like, Repository } from 'typeorm';
import { TodoEntityORM } from 'src/TypeORM/entiteTypeORM/entities/TodoentityORM.entity';
import { UpdateORMTodoDTO } from './DTO/updateORM-todo.dto';
import { StatusCritereTodoDTO } from './DTO/status-critere-todo.dto';

@Injectable()
export class TodoService {
    // Injecter le repository
    constructor(
      @InjectRepository(TodoEntityORM) //pour injecter une repository
      private todoRepository: Repository<TodoEntityORM>
    ){}
    //*********** */
    //recuperer l'un des elements de repository
    async getTodoORM(): Promise<TodoEntityORM[]>{ 
      //En JavaScript, les opérations asynchrones sont placées dans des files
      // d’attentes qui vont s’exécuter après que le fil d’exécution principal 
      //ou la tâche principale (le « main thread » en anglais) ait terminé ses opérations. 
      //Elles ne bloquent donc pas l’exécution du reste du code JavaScript.
      //Une promesse est un objet (Promise) qui représente 
      //la complétion ou l'échec d'une opération asynchrone
      return await this.todoRepository.find(); //await pour attendre jusqu'a ce qu'il termine son travail
      //puisque c'est asynchrone
    }

    async getTodoORMcritere(chaine: string, statutToFind: TodoStatusEnum): Promise<TodoEntityORM[]>{ 
      const qb = this.todoRepository.createQueryBuilder("todo");
      qb.where(`${chaine} IN description`).orWhere(`${chaine} IN name`).orWhere(`${statutToFind} Equals statut`);
      return qb.getRawMany();
    }

    async getTodoORMcritereV2(StatusCritereDTO: StatusCritereTodoDTO): Promise<TodoEntityORM[]>{ 
      const {chaine, statut} = StatusCritereDTO; //on recupere les donnees de l'objet DTO
      return await this.getTodoORMcritere(chaine, statut); //on appelle la methode version1 pour faire le reste du travail
    }

    async getTodoORMcritereV3(chaine: string, statutToFind: TodoStatusEnum): Promise<TodoEntityORM[]>{ 
      const qb = this.todoRepository.createQueryBuilder("todo");
      qb.where(`${chaine} IN description`).orWhere(`${chaine} IN name`).andWhere(`${statutToFind} Equals statut`);
      return qb.getRawMany();
    }

    async findTodoORMById(id: number): Promise<TodoEntityORM> {
      //selon la documentation TypeORM on doit faire appel à la fonction findOne de cette maniere : "findOne({where:{id: id}});" 
      const newTodo = await this.todoRepository.findOne({where:{id: id}}); 
      if(! newTodo) {
        throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
      }
      return await newTodo;
    }
    
    async addTodoORM(todo: AddTodoDTO): Promise<TodoEntityORM>{
      return await this.todoRepository.save(todo); // la methode save de repository; on lui passe quelque chose qui
      //est partielle à une todoEntity, il va le recuperer et fait le necessaire pour les autres champs
      //nous allons les champs qui existent dans la DTO, et lui s'occupe du reste (id, updatedAt..etc)
    }

    async modifierTodoORM(id: number, /*recuprer l'objet d'origine*/ todo: UpdateORMTodoDTO): Promise<TodoEntityORM>{
      //on recupere le todo ayant comme id "id" puis on remplace les anciennes valeurs par ceux du todo passé en parametres
      const newTodo = await this.todoRepository.preload({ //attendre jusqu'à la repository va préloader/précharger une entité
          id, //il va chercher l'objet qui a cet ID et le charge
          ...todo // il va recuperer toutes les propriétés de TodoEntityORM et il va le décomposer
          // c'est l'opérateur spread = décomposer l'objet en l'ensemble de ses elements
      });
      // on teste le cas où le todo à modifier n'existe pas
      if(! newTodo){
        throw new NotFoundException(`le todo d'id ${id} n'existe pas`);
      }
      //recuperer le nouveau todo et le sauvegarder
      return await this.todoRepository.save(newTodo); 
    }

    async supprimerTodoORM(id: number){
      // delete peut prendre un ensemble de criteres, un id ou un tableau d'ids, ou un objet exemple: 
      // return await this.todoRepository.delete({name: 'first todo'});
      return await this.todoRepository.delete(id);
    }
    

    async softDeleteTodoORM(id: number){
        return this.todoRepository.softDelete(id);
    }

    async restoreTodoORM(id: number){
      //elle n'a pas besoin d'aller chercher l'element avant le restaurer, elle va le faire avec l'id uniquement
      this.todoRepository.restore(id);
    }

    //api permettant d’avoir le nombre de todo pour chacun des trois statues
    async todoNumberByStatut(){
      const qb = this.todoRepository.createQueryBuilder("todo"); //crée un query builder
      //chercher le nombre de todo par statut
      qb.select("todo.statut, count (todo.id)") //on fait un count pour les id qu'on a
        .groupBy("todo.statut") //grouper les todos par statut et on va les counter
        console.log(qb.getSql()); // tester avant de lancer chaque requete, la requete qui va etre lancée
        //pour savoir si c'est la requete souhaitée ou pas
      return qb.getRawMany();
      
    }
    //*/************* */

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

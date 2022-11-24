import { Inject, Controller, Get, Post, Delete, Put, Body, Param, NotFoundException, Req, Res, Query, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { identity } from 'rxjs';
import { brotliDecompressSync } from 'zlib';
import { AddTodoDTO } from './DTO/add-todo.dto';
import { GetPaginatedTodoDTO } from './DTO/get-paginated-todo.dto';
import { UpdateTodoDTO } from './DTO/update-todo.dto';
import { TodoService } from './todo.service';
import { TodoEntity } from './todomodel.entity';
import { TodoStatusEnum } from './todomodel.entity';

@Controller('todo')
export class TodoController {
    
    constructor(
        private todoService: TodoService //pour injecter un service a la classe controller
        //on ne lui passe ni de parametres ni rien , car ce n'est pas a nous d'instancier cet objet là
        ){}
    todos: TodoEntity[];

    //@Get()
    //getTodo(){
        //return 'liste des todos';
    //}

    @Get('v2')
    getTodoV2(
       // @Req() request: Request,
        // @Res() response: Response
    ){
        return this.todos;
    }
    @Get()
    getTodos(
        @Query() mesQueryParams: GetPaginatedTodoDTO, 
    ): TodoEntity[]{
        //console.log(mesQueryParams);
        return this.todoService.getTodos();
    }

    @Get('/:id')
    getTodoByID(
        //On definit le pipe 'ParseIntPipe' pour faire la conversion string vers int
        //si on n'utilise pas ce pipe, on doit mettre un "+" devant "id"
        @Param('id', new ParseIntPipe({
            errorHttpStatusCode: HttpStatus.NOT_FOUND //Definition d'un message d'erreur personnalisé
        })) id //retourner un objet qui contient un ensmbl de parametres
    ){
        return this.todoService.getTodoByID(id);
    }
    @Post()
    //addTodo(){
        //return 'ajouter todos';
    //}
    addTodo(@Body() newTodoEntity: AddTodoDTO) : TodoEntity{
        return this.todoService.addTodo(newTodoEntity);
    }


    @Delete(':id')
    supprimerTodo(
        @Param('id', ParseIntPipe) id
    ){
        this.todoService.supprimerTodo(id);
    }

    @Put()
    modifierTodo(
        @Param('id') id,
        //@Body() newTodo: Partial<TodoEntity> // une partie de todo
        @Body() newTodo: Partial<UpdateTodoDTO> //en utilisant le DTO specifique pour l update
    ){
        //"+id" si on n'utilise pas le pipe 'ParseIntPipe'
        return this.todoService.modifierTodo(+id, newTodo);
    }
}

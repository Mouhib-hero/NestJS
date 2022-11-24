import { Inject, Controller, Get, Post, Delete, Put, Body, Param, NotFoundException, Req, Res, Query, ParseIntPipe, HttpStatus, Patch } from '@nestjs/common';
import { identity } from 'rxjs';
import { TodoEntityORM } from 'src/TypeORM/entiteTypeORM/entities/TodoentityORM.entity';
import { brotliDecompressSync } from 'zlib';
import { AddTodoDTO } from './DTO/add-todo.dto';
import { GetPaginatedTodoDTO } from './DTO/get-paginated-todo.dto';
import { StatusCritereTodoDTO } from './DTO/status-critere-todo.dto';
import { UpdateTodoDTO } from './DTO/update-todo.dto';
import { UpdateORMTodoDTO } from './DTO/updateORM-todo.dto';
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

    /********************* */
    //partie specifique pour TypeORM (repository)//
    @Get('todoORM')
    async getTodoORM(): Promise<TodoEntityORM[]>{
        return await this.todoService.getTodoORM();
    }

    @Post('todoORM')
    async addTodoORM(@Body() todo: AddTodoDTO):Promise<TodoEntityORM>{
        return await this.todoService.addTodoORM(todo);
    }

    @Patch('todoORM/:id') //on doit ajouter l'ID pour le recuperer en @Param
    async modifierTodoORM(
        @Body() updateTodoDTO: UpdateORMTodoDTO,
        @Param('id', ParseIntPipe) id: number
    ):Promise<TodoEntityORM>{
        return await this.todoService.modifierTodoORM(id, updateTodoDTO);
    }

    @Delete('todoORM/:id')
    async supprimerTodoORM(
        @Param('id', ParseIntPipe) id:number
    ){
        return await this.todoService.supprimerTodoORM(id);
    }

    //soft delete
    @Delete('todoORM/softDelete/:id')
    async softDeleteTodoORM(
        @Param('id', ParseIntPipe) id:number
    ){
        return this.todoService.softDeleteTodoORM(id);
    }

    //restorer un todo
    @Get('todoORM/restore/:id')
    async restoreTodoORM(
        @Param('id', ParseIntPipe) id:number
    ){
        return await this.todoService.softDeleteTodoORM(id);
    } // en utilisant la fonction restore, il va aller au niveau de la base de données et il va transformer le champ deletedAt à null
    
    //Calculer le nombre de todos par status
    @Get('todoORM/stat')
    async todoNumberByStatut(){
        return await this.todoService.todoNumberByStatut();
    }
    
    //getTodoORMcritere retourne l’ensemble des todos dont la description ou le nom contiennent la chaine ou dont
    //le statut est celui recherché
    @Get('todoORM/:chaine/:status')
    async getTodoORMcritere(@Param('chaine') chaine: string, @Param('status') statutToFind: TodoStatusEnum): Promise<TodoEntityORM[]>{
        return await this.todoService.getTodoORMcritere(chaine, statutToFind);
    }

    //recuperer un ensemble de todo selon critere et status, mais en utilisant une DTO qui gere le couple (critere, status)
    @Get('todoORM/V2/:chaine/:status')
    async getTodoORMcritereV2(@Body() StatusCritereDTO: StatusCritereTodoDTO): Promise<TodoEntityORM[]>{
        return await this.todoService.getTodoORMcritereV2(StatusCritereDTO);
    }

    //recuperer un todo par son ID
    @Get('todoORM/:id')
    async findTodoORMById(@Param('id', ParseIntPipe) id): Promise<TodoEntityORM>{
        return await this.todoService.findTodoORMById(id);
    }

    //Todo dont le name ou description contiennent la chaine passée en paramètre et ayant le statut passé en paramètre.
    @Get('todoORM/V3/:chaine/:status')
    async getTodoORMcritereV3(@Param('chaine') chaine: string, @Param('status') statutToFind: TodoStatusEnum): Promise<TodoEntityORM[]>{
        return await this.todoService.getTodoORMcritereV3(chaine, statutToFind);
    }
    //************** */


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

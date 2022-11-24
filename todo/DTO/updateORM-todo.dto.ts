import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { TodoStatusEnum } from 'todo/todomodel.entity';

export class UpdateORMTodoDTO{

    @IsOptional() //il est inutile de faire IsNotEmpty puisqu'on utilisera un patch et pas un put
    @IsString() // le name est une chaine
    @MinLength(3, {
        message: 'Attention! Ne pas faire moins de 3 caracteres'
      }) // taille minimale de 3 caractères 
    @MaxLength(10, {
        message: 'Attention! Ne pas depassez 10 caracteres'
      }) //taille maximale de 10 caractères
    name: string;

    @IsOptional()  
    @IsString() // la description est une chaine
    @MinLength(10, {
        message: 'Attention! ecrire au minimum 10 caracteres'
      }) //la taille minimale est 10 caracteres
    description: string; 

    @IsOptional()
    statut: TodoStatusEnum;
}
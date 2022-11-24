import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { TodoStatusEnum } from 'todo/todomodel.entity';

export class UpdateTodoDTO{
    @IsString() // le name est une chaine
    @MinLength(3, {
        message: 'Attention! Ne pas faire moins de 3 caracteres'
      }) // taille minimale de 3 caractères 
    @MaxLength(10, {
        message: 'Attention! Ne pas depassez 10 caracteres'
      }) //taille maximale de 10 caractères
    name: string;


    @IsString() // la description est une chaine
    @MinLength(10, {
        message: 'Attention! ecrire au minimum 10 caracteres'
      }) //la taille minimale est 10 caracteres
    description: string; 

    @IsNotEmpty({
        message: 'Attention! Il est necassaire de definir un statut pour savoir l etat de todo'
      })
    statut: TodoStatusEnum;
}
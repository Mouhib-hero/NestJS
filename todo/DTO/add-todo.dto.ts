import { IsIn, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AddTodoDTO{
    @IsString() // le name est une chaine
    @IsNotEmpty() //ne doit pas être vide
    @MinLength(3, {
        message: 'Attention! Ne pas faire moins de 3 caracteres'
      }) // taille minimale de 3 caractères 
    @MaxLength(10, {
        message: 'Attention! Ne pas depassez 10 caracteres'
      }) //taille maximale de 10 caractères
    name: string;


    @IsString() // la description est une chaine
    @IsNotEmpty() //ne doit pas être vide
    @MinLength(10, {
        message: 'Attention! ecrire au minimum 10 caracteres'
      }) //la taille minimale est 10 caracteres
    description: string; 
}
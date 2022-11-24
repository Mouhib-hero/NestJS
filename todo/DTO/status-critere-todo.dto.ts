import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { TodoStatusEnum } from "todo/todomodel.entity";

//DTO permettant de récupérer le couple statut, critère telque critere = chaine
export class StatusCritereTodoDTO{
    @IsNotEmpty()
    @MinLength(3, {
        message: 'Attention! Ne pas faire moins de 3 caracteres'
      }) // taille minimale de 3 caractères 
    @MaxLength(10, {
        message: 'Attention! Ne pas depassez 10 caracteres'
      }) //taille maximale de 10 caractères
    chaine: string; //le critere qu'on va recuperer

    @IsNotEmpty()
    statut: TodoStatusEnum
}
/*
https://docs.nestjs.com/modules
*/
export enum TodoStatusEnum {
  'actif' = "En cours",
  'waiting' = "En attente",
  'done' = "Finalisé"
  }
export class TodoEntity { 
  
  id: number;
  name: string;
  description: string;
  dateCreation: Date;
  statut: TodoStatusEnum; 
}

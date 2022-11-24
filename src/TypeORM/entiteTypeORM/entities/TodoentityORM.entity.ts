import { TimestampEntities } from "src/TypeORM/Generics/timestamp.etities";
import { TodoStatusEnum } from "todo/todomodel.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() //Decorateur qui appartient a la bibliotheque typeORM
//on peut specifier un nom ex; @Entity('Todo') , sinon elle prend 
//le meme nom que la classe
export class TodoEntityORM extends TimestampEntities{
    @PrimaryGeneratedColumn() //Clé primaire
    id: number;
    @Column({
        name:'name',
        length: 10 //varchar de 50
    }) //une colonne
    name: string;
    @Column({
        length: 10
    })
    description: string;
    @Column()
    statut: TodoStatusEnum; 

    /* Ils sont sont des champs qu’on peut utiliser plusieurs fois donc on propose de faire autre chose en
    utilisant l'entité timestamp

    @CreateDateColumn({ //represente la date de creation de l'entité qui sera
        //affectée automatiquement par typeORM
        update: false //ne peut pas être modifié une fois crée.
    })
    dateCreation: Date;

    @UpdateDateColumn() //gérés automatiquement par typeORM
    updatedAt: Date;

    @DeleteDateColumn() //gérés automatiquement par typeORM et peut permettre
    // de faire le "soft delete"
    deletedAt: Date;
    */
}
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

//On étends cette classe pour chaque entité qui en aura besoin , "extends TimestampEntities"
export class TimestampEntities{
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
}
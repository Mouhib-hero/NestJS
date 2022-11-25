import { cv } from "cv/cv/entities/cv.entity";
import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as Id } from 'uuid';

export class Skill { 
    @PrimaryGeneratedColumn()
    id = Id();
    
    @Column()
    designation: string;

    @ManyToMany(
      () => cv
    )

    @JoinTable({
      name: 'Cv_skill',
      joinColumn: { name: 'cv', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'skill', referencedColumnName: 'id' },
    })
    cv: cv;
    static designation: string;
}

import { Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as Id } from 'uuid';

export class User {  
    @PrimaryGeneratedColumn()
    id = Id();
  
    @Column()
    designation: string;

    @Column()
    username: string;

    @Column()
    email: string;
    
    @Column()
    password: string;
  }

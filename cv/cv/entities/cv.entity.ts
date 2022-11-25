import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'user/user/entities/user.entity';
import { v4 as Id } from 'uuid';
@Entity('cv')
export class cv {

  @PrimaryGeneratedColumn()
  id = Id();

  @Column()
  name: string;

  @Column()
  firstname: string;

  @Column()
  Age: number;

  @Column()
  Cin: string;

  @Column()
  Job: string;

  @Column()
  path: string;

  @ManyToOne(() => User)
  user: User;
}
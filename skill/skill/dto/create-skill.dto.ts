import { IsNotEmpty, MinLength } from "class-validator";
import { v4 as Id } from 'uuid';

export class CreateSkillDto {
    id = Id();

    
    @IsNotEmpty()
    @MinLength(10, { 
        message: 'La taille doit dépasser 10' 
    })
    designation: string;
}

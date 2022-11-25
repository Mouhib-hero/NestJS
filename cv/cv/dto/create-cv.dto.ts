import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { v4 as Id } from 'uuid';

export class CreateCvDto {
    id = Id();
    
    @IsNotEmpty()
    @MinLength(5, {  
        message: 'La taille doit dépasser 5'
    })
    name: string;
  
    @MinLength(3)
    @MaxLength(10, {  
        message: 'La taille ne doit pas dépasser 5'
    })
    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    age: number;

    @MinLength(3, {  
        message: 'La taille doit dépasser 3'
    })
    @MaxLength(10, {  
        message: 'La taille ne doit pas dépasser 10'
    })
    @IsNotEmpty()
    Cin: string;

    @MinLength(3, {  
        message: 'La taille doit dépasser 3'
    })
    @MaxLength(10 , {  
        message: 'La taille ne doit pas dépasser 10'
    })
    @IsNotEmpty()
    job: string;

    @MinLength(3, {  
        message: 'La taille doit dépasser 3'
    })
    @MaxLength(10 , {  
        message: 'La taille ne doit pas dépasser 10'
    })
    @IsNotEmpty()
    path: string;
}

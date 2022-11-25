import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { v4 as Id } from 'uuid';


export class CreateUserDto {
    id = Id();
    
    @IsNotEmpty()
    @MinLength(10, { 
        message: 'La taille doit dépasser 10' 
    })
    username: string;
  
    @MinLength(3, { 
        message: 'La taille doit dépasser 3' 
    })
    @MaxLength(10, { 
        message: 'La taille ne doit pas dépasser 10' 
    })
    @IsNotEmpty()
    email: string;

    @MinLength(3, { 
        message: 'La taille doit dépasser 3' 
    })
    @MaxLength(10, { 
        message: 'La taille ne doit pas dépasser 10' 
    })
    @IsNotEmpty()
    password: string;
}

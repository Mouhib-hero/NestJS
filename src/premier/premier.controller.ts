import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { PremierService } from './premier.service';

@Controller('premier')
export class PremierController {
    constructor(private readonly PremierService: PremierService) {}

    @Get('test')
        getHello(): string {
            return this.PremierService.getHello();
        }
    @Post('post') 
        premierPost(): string{
            return this.PremierService.premierPost();
        }
    @Delete('delete')
        premierDelete(): string{
            return this.PremierService.premierDelete();
        }
    @Patch('patch')
        premierPatch(): string{
            return this.PremierService.premierPatch();
        }
    @Put('put')
        premierPut(): string{
            return this.PremierService.premierPut();
        }
}

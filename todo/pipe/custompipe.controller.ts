/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post } from '@nestjs/common';
import { MajusculeFusionBodyPipe } from './majusculefusionbody.pipe';

@Controller('custompipe')
export class CustompipeController {
    @Get('pipe')
    getHello(): string {
        return 'Hello pipe!';
    }
    @Post('pipe')
    testPipe(
        @Body(MajusculeFusionBodyPipe) skills //: string[]
    ){
        return skills;
    }
 }

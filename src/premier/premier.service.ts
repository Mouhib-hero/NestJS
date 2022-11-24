/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class PremierService {
    getHello(): string {
        return 'Hello World!';
    }

    premierPost(): string{
        return'POST';
    }

    premierDelete(): string{
        return'Delete';
    }

    premierPatch(): string{
        return'Patch';
    }

    premierPut(): string{
        return'Put';
    }
 }

/*
https://docs.nestjs.com/modules
*/

import { Global, Module } from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';
//Provider la fonction uuid
const UuidProvider = {provide: 'uuidv4', useValue: uuidv4}
@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [UuidProvider],
    exports: [UuidProvider]
})
export class CommonModule {}

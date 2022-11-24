import { Global, Module } from '@nestjs/common';
import { PremierController } from './premier.controller';
import { PremierService } from './premier.service';
@Global()
@Module({
  imports: [],
  controllers: [PremierController],
  providers: [PremierService],
  exports: [PremierService],
})
export class PremierModule {}

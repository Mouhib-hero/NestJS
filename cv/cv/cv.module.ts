import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';

@Module({
  controllers: [CvController],
  providers: [CvService]
})
export class CvModule {}

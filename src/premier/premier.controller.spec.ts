import { Test, TestingModule } from '@nestjs/testing';
import { PremierController } from './premier.controller';

describe('PremierController', () => {
  let controller: PremierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PremierController],
    }).compile();

    controller = module.get<PremierController>(PremierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { randSkill } from '@ngneat/falso';
import { Skill } from 'skill/skill/entities/skill.entity';
import { SkillService } from 'skill/skill/skill.service';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  // contexte indépendent du web (On lance les commandes sans avoir interet a savoir si l'app web marche ou pas)
  // Todo :  Do What you want
  const skillService = app.get(SkillService);
  for (let i = 0; i < 50; i++) {
    const skill = new Skill();
    Skill.designation = randSkill();
    await skillService.create(skill);
  }
  await app.close();
}

bootstrap();
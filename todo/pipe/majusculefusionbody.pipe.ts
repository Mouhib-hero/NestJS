/*
https://docs.nestjs.com/pipes
*/

import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class MajusculeFusionBodyPipe implements PipeTransform {
  transform(skills: {data : string[]}, metadata: ArgumentMetadata) { //"skills: {data : string[]}" : Un object data avec un tableau de string
    if (metadata.type === 'body'){ //Si le contenu qu'on le gère est un body, on va faire le travail necessaire
      //sinon je vais retourner le tableau comme il est
        return skills.data.map((element)=>element.toUpperCase()).join('-'); //pour chaque element du tableau, transforme le en majuscule
        //puis on fait la fusion grâce à 'join' tq chaque string séparé par "-"
    } //else {
      //throw new BadRequestException(`Aucune information n'a été récupérée.`);
    //}
    return skills.data;
  }
}

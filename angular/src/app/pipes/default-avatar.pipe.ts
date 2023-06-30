import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultAvatar'
})
export class DefaultAvatarPipe implements PipeTransform {
  transform(value: string | null): string {
    if (value) {
      return value; // Retourne la valeur d'avatar si elle est définie
    } else {
      return 'default.png'; // Chemin vers l'image par défaut
    }
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersEntity } from '../entities/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: UsersEntity = request.user;
    const adminRequired = request.adminRequired;

  if (adminRequired) {
    // Vérifie si l'utilisateur est administrateur
    return user.rank.id === 1 || user.rank.id === 2;
  }

    // Vérifiez si l'utilisateur est administrateur
    return user.rank.id === 1 || user.rank.id === 2;
  }
}

import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { UsersEntity } from '../entities/user.entity';
import { RanksEntity } from '../entities/rank.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminMiddleware implements NestMiddleware {

  constructor(private jwtService: JwtService) {}
  
  use(req: Request, res: Response, next: NextFunction) {
    verifyJwtToken(req, this.jwtService); // Appel de la fonction pour vérifier le token JWT

    const user: UsersEntity = req['user']; // Utilisation de req['user'] au lieu de req.user
    
    if (!isAdminUser(user.rank)) {
      // Si l'utilisateur n'est pas un administrateur, renvoyer une erreur
      throw new Error('Accès refusé. Seuls les administrateurs sont autorisés.');
    }

    // Si l'utilisateur est un administrateur, continuer vers la prochaine étape de la requête
    next();
  }
}

function verifyJwtToken(req: Request, jwtService: JwtService) {
  const token = req.headers['authorization'];
  

  if (token) {
    try {
      const decoded = jwtService.verify(token);
      req['user'] = decoded; // Ajoute les informations de l'utilisateur décodées à l'objet de demande (req)
    } catch (err) {
      console.log(err);
      // Le token est invalide ou a expiré
      // Tu peux choisir de renvoyer une erreur 401 Unauthorized ou effectuer d'autres actions en conséquence
      // Exemple : throw new UnauthorizedException('Invalid token');
      throw new HttpException("Token invalide", HttpStatus.UNAUTHORIZED)
    }
  }
}

// Fonction pour vérifier si l'utilisateur est administrateur en fonction de son rang (rank)
function isAdminUser(rank: RanksEntity): boolean {
  // Vérifiez si le rang de l'utilisateur est égal à 1 ou 2
  return rank.id === 1 || rank.id === 2;
}
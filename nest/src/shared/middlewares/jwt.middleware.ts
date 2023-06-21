import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction } from "express";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    
    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        req['user'] = decoded; // Ajoute les informations de l'utilisateur décodées à l'objet de demande (req)

        // Vérifie si l'authentification admin est requise pour cette route
      req['adminRequired'] = true; // Modifie cette condition selon tes besoins
      } catch (err) {
        console.log("Token verification error:", err);
        // Le token est invalide ou a expiré
        // Tu peux choisir de renvoyer une erreur 401 Unauthorized ou effectuer d'autres actions en conséquence
        // Exemple : throw new UnauthorizedException('Invalid token');
      }
    }

    next();
  }
}
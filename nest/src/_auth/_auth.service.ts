import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/_user/_user.service";
import { NewUser } from "src/shared/dto/_users/newUser.dto";

@Injectable()
export class AuthService {
  private secretKey : string

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {
    this.secretKey = process.env.SECRET_KEY;
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    
    if (user && (await this.userService.comparePassword(password, user.mdp))) {
      const token = await this.generateToken(user);
      // Les informations d'identification sont valides, retournez le jeton d'authentification
      return { user, token };
    }

    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  async register(login : string, email: string, password: string): Promise<any> {
    const userExists = await this.userService.findByEmail(email);

    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const validUser = new NewUser();
    validUser.login = login;
    validUser.mail = email;
    validUser.mdp = password;
  
    // Crée le nouvel utilisateur dans la base de données
    const newUser = await this.userService.create(validUser);
  
    // Génère le token pour le nouvel utilisateur
    const token = await this.generateToken(newUser);
  
    return { user: newUser, token };
  }

  // async validateUser(email: string, password: string): Promise<any> {
  //   const user = await this.userService.findByEmail(email);
    
  //   if (user && (await this.userService.comparePassword(password, user.mdp))) {
  //     const token = await this.generateToken(user);
  //     // Les informations d'identification sont valides, retournez le jeton d'authentification
  //     return { user, token };
  //   }
    
  //   return null;
  // }
  
  async generateToken(user: any): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    const options = {
      expiresIn: '1h',
      secret: this.secretKey
    }; // Spécifiez la durée de validité du jeton
    
    return this.jwtService.sign(payload, options);
  }
}
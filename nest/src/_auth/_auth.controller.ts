import { Body, Controller, Post, Req, UnauthorizedException } from "@nestjs/common"
import { AuthService } from "./_auth.service";
import { LoginDTO } from "src/shared/dto/_auth/login.dto";
import { RegisterDTO } from "src/shared/dto/_auth/register.dto";

@Controller('api/login')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    async login(
        @Body() loginDto: LoginDTO
    ) {
        // Appelez le service d'authentification pour gérer la demande de connexion
        const result = await this.authService.login(loginDto.email, loginDto.password);
  
        return { token: result.token };
    }

    @Post('register')
    async register(
        @Body() registerDto: RegisterDTO
    ) {
        const { login, email, password } = registerDto;
    
        const result = await this.authService.register(login, email, password);
    
        return result;
    }
}
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "src/shared/entities/user.entity";
import { AuthController } from "./_auth.controller";
import { AuthService } from "./_auth.service";
import { UserService } from "src/_user/_user.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { RanksEntity } from "src/shared/entities/rank.entity";

@Module({
    controllers : [AuthController],
    providers : [
        AuthService
        , UserService
        , JwtService
    ],
    imports : [
        JwtModule.register({
            secret: process.env.JWT_SECRET
            , signOptions: { expiresIn: '1h' }
        })
        , TypeOrmModule.forFeature([
            UsersEntity
            , RanksEntity
        ])
    ]
})
export class AuthModule {}
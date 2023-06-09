import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "src/shared/entities/user.entity";
import { UserController } from "./_user.controller";
import { UserService } from "./_user.service";
import { RanksEntity } from "src/shared/entities/rank.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
    controllers : [UserController],
    providers : [UserService],
    imports : [
        TypeOrmModule.forFeature([
            UsersEntity
            , RanksEntity
        ])
        , JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: { expiresIn: '1d' }
        }),
    ]
})
export class UserModule {}
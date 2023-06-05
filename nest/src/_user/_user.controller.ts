import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, ValidationPipe } from "@nestjs/common"
import { UserService } from "./_user.service"
import { User } from "src/shared/dto/_users/user.dto"
import { UserId } from "src/shared/dto/_users/userId.dto"
import { NewUser } from "src/shared/dto/_users/newUser.dto"
import { AffichageUserDTO, AffichageUserSmollDTO } from "src/shared/dto/_users/affichage/affichageUser.dto"
import { RankId } from "src/shared/dto/_users/rankId.dto"
import { UserRank } from "src/shared/dto/_users/userRank.dto"

@Controller('api/users')
export class UserController {
    constructor(
        private readonly userService : UserService
    ) {}

    @Get()
    getAllUser() : Promise<AffichageUserSmollDTO[]>
    {
        return this.userService.getAll()
    }

    @Get(":userId")
    getOneUser(
        @Param("userId", ParseIntPipe) userId : UserId
    ) : Promise<AffichageUserDTO>
    {
        return this.userService.getOne(userId)
    }

    @Post()
    createUser(
        @Body(ValidationPipe) newUser : NewUser
    ) : Promise<AffichageUserDTO>
    {
        return this.userService.create(newUser)
    }

    @Patch(":userId")
    updateRank(
        @Param("userId", ParseIntPipe) userId : UserId,
        @Body() updatedToRank : UserRank
    ) : Promise<RankId>
    {
        return this.userService.updateRank(userId, updatedToRank)
    }

    @Put(":userId")
    updateUser(
        @Param("userId", ParseIntPipe) userId : UserId,
        @Body() updatedUser : User
    ) : Promise<AffichageUserDTO>
    {
        return this.userService.update(userId, updatedUser)
    }

    @Delete(":userId")
    disableUser(
        @Param("userId", ParseIntPipe) userId : UserId
    ) : Promise<UserId>
    {
        return this.userService.disable(userId)
    }
}
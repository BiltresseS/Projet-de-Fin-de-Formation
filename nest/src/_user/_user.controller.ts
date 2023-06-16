import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, StreamableFile, ValidationPipe } from "@nestjs/common"
import { UserService } from "./_user.service"
import { UserId } from "src/shared/dto/_users/userId.dto"
import { AffichageNewUserDTO, AffichageUserDTO, AffichageUserSmollDTO } from "src/shared/dto/_users/affichage/affichageUser.dto"
import { RankId } from "src/shared/dto/_users/rankId.dto"
import { UserRank } from "src/shared/dto/_users/userRank.dto"
import { UserModified } from "src/shared/dto/_users/userModified.dto"
import { NewUserDTO } from "src/shared/dto/_users/newUser.dto"

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

    @Get('image/:id')
    async getImage(@Param('id') id: number) {
        const image = await this.userService.getImage(id);
        return new StreamableFile(Buffer.from(image, "base64"), { type: 'image/jpeg' })
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
        @Body() updatedUser : UserModified
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
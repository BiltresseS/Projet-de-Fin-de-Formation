import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, StreamableFile, UseGuards, ValidationPipe } from "@nestjs/common"
import { UserService } from "./_user.service"
import { UserId } from "src/shared/dto/_users/userId.dto"
import { AffichageUserDTO, AffichageUserSmollDTO } from "src/shared/dto/_users/affichage/affichageUser.dto"
import { RankId } from "src/shared/dto/_users/rankId.dto"
import { UserRank } from "src/shared/dto/_users/userRank.dto"
import { UserModified } from "src/shared/dto/_users/userModified.dto"
import { JwtMiddleware } from "src/shared/middlewares/jwt.middleware"
import { AdminGuard } from "src/shared/guards/admin.guard"
import { UsersEntity } from "src/shared/entities/user.entity"

@Controller('api/users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get()
    getAllUser(
        @Query() query
    ): Promise<AffichageUserSmollDTO[]> {
        let includeDeleted = false;

        if (query.withDeleted !== undefined) {
            includeDeleted = query.withDeleted
        }

        return this.userService.getAll(includeDeleted)
    }

    @Get(":userId")
    getOneUser(
        @Param("userId", ParseIntPipe) userId: UserId
        ,
        @Query() query
    ): Promise<AffichageUserDTO> {
        let includeDeleted = false;

        if (query.withDeleted !== undefined) {
            includeDeleted = query.withDeleted
        }

        return this.userService.getOne(userId, includeDeleted)
    }

    @Get('image/:id')
    async getImage(
        @Param('id') id: number
    ) {
        const image = await this.userService.getImage(id);
        return new StreamableFile(Buffer.from(image, "base64"), { type: 'image/jpeg' })
    }

    @Patch(":userId")
    updateRank(
        @Param("userId", ParseIntPipe) userId: UserId
        , @Body() updatedToRank: UserRank
    ): Promise<RankId> {
        return this.userService.updateRank(userId, updatedToRank)
    }

    @Put(":userId")
    updateUser(
        @Param("userId", ParseIntPipe) userId: UserId
        , @Body() updatedUser: UserModified
    ): Promise<AffichageUserDTO> {
        return this.userService.update(userId, updatedUser)
    }

    @Delete(":userId")
    disableUser(
        @Param("userId", ParseIntPipe) userId: UserId
    ): Promise<UserId> {
        return this.userService.disable(userId)
    }

    @Patch(':userId/reactivate')
    reactivateUser(
        @Param('userId') userId: number
    ): Promise<AffichageUserDTO> {
        return this.userService.reactivateUser(userId);
    }
}
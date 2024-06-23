import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "src/auth/decorator";
import { AdminGuard, JwtGuard, ModeratorGuard, UserGuard } from "src/auth/guard";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { RateDto } from "./dto/rate.dto";

@UseGuards(JwtGuard)
@Controller("api/users")
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get("whoami")
  whoAmI(@GetUser() user: User) {
    return user;
  }

  @Get()
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get("user/:id")
  findUser(@Param() param: any) {
    return this.userService.findUser(param.id);
  }

  @Get("organizer/:id")
  findOrganizerEvents(@Param() param: any) {
    return this.userService.findOrganizerEvents(param.id);
  }

  @Patch(":id")
  @UseGuards(UserGuard)
  updateUser(@Param('id') id: string, @Body() dto: UserDto) {
    return this.userService.updateUser(+id, dto);
  }

  @Delete(":id")
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }

  @Post("rate/:userId/:eventId")
  @UseGuards(UserGuard)
  rateUser(@Param() params: any, @Body() dto: RateDto, @GetUser() user: User) {
    return this.userService.rateUser(params.userId, params.eventId, dto, user);
  }

  @Get("rates")
  findAllUserRates() {
    return this.userService.findAllUserRates();
  }

  @Get("myrate")
  @UseGuards(UserGuard)
  findCurrentUserRate(@GetUser() user: User) {
    return this.userService.findCurrentUserRate(user);
  }

  @Get("rate/:id")
  viewUserRate(@Param() param: any) {
    return this.userService.viewUserRate(param.id);
  }

  @Delete("rate/:id")
  removeUserRate(@Param() param: any, @GetUser() user: User) {
    return this.userService.removeUserRate(param.id, user);
  }

  @Patch("moderator/:id")
  @UseGuards(AdminGuard)
  addModerator(@Param() param: any) {
    return this.userService.addModerator(param.id);
  }

  @Patch("user/:id") 
  @UseGuards(AdminGuard)
  removeModerator(@Param() param: any) {
    return this.userService.removeModerator(param.id);
  }

  @Patch("ban/:id")
  @UseGuards(ModeratorGuard)
  banUser(@Param() param: any) {
    return this.userService.banUser(param.id);
  }

  @Patch("unban/:id")
  @UseGuards(ModeratorGuard)
  unbanUser(@Param() param: any) {
    return this.userService.unbanUser(param.id);
  }
}
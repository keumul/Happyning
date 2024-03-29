import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "src/auth/decorator";
import { AdminGuard, JwtGuard, UserGuard } from "src/auth/guard";
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
  @UseGuards(AdminGuard)
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get("user/:id")
  findUser(@Param() param: any) {
    return this.userService.findUser(param.id);
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

  @Post("rate/:id")
  @UseGuards(UserGuard)
  rateUser(@Param() param: any, @Body() dto: RateDto, @GetUser() user: User) {
    return this.userService.rateUser(param.id, dto, user);
  }

  @Get("rates")
  @UseGuards(AdminGuard)
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
  @UseGuards(UserGuard)
  removeUserRate(@Param() param: any, @GetUser() user: User) {
    return this.userService.removeUserRate(param.id, user);
  }
}
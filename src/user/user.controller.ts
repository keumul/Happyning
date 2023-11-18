import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";

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

  @Get(":id")
  findUser(@Param() param: any) {
    return this.userService.findUser(param.id);
  }

  @Patch(":id")
  updateUser(@Param('id') id: string, @Body() dto: UserDto) {
    return this.userService.updateUser(+id, dto);
  }

  @Delete(":id")
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }
}
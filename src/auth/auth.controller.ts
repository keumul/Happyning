import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller("api/auth")
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post("signup")
  signup(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signin(@Body() authDto: AuthDto) {
    return this.authService.signin(authDto);
  }
}

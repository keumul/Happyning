import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, LoginDto } from "./dto";
import { RESPONSE_PASSTHROUGH_METADATA } from "@nestjs/common/constants";

@Controller("api/auth")
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post("signup")
  signup(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signin(@Body() authDto: LoginDto){
    return this.authService.signin(authDto)
  }

  @Post("validate")
  validate(@Body() authDto: LoginDto) {
    return this.authService.validateUser(authDto);
  }

  @Get("confirm/:username")
  confirm(@Param() params: any) {
    return this.authService.confirmationStatus(params.username);
  }

  @Post("resendCode")
  resendCode(@Body() dto: { email: string }) {
    return this.authService.resendActivationCode(dto.email);
  }
}

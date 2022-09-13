import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/login.request';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/session')
  async login(@Body() loginRequest: LoginRequest) {
    const user = await this.authService.authenticate(
      loginRequest.username,
      loginRequest.password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    const token = await this.authService.createToken(user);

    return {
      accessToken: token,
    };
  }
}

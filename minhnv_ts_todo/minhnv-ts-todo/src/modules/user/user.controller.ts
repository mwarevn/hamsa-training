import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { AddUserDto } from 'src/modules/user/dto/add-user.dto';
import { UserLoginDto } from 'src/modules/user/dto/user-login.dto';
import { UserService } from 'src/modules/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('sign-up') // register account
  async registerAccount(@Body() addUserDto: AddUserDto, @Res() res: Response) {
    const createdUser = await this.userService.registerAccount(addUserDto);

    if (!createdUser) {
      throw new BadRequestException();
    }

    res.json({ success: true, data: createdUser });
  }

  @Post('sign-in') // login
  async login(@Body() loginDto: UserLoginDto, @Res() res: Response) {
    const validUser = (await this.userService.login(loginDto)).toObject();

    delete validUser.password;

    if (!validUser) {
      throw new UnauthorizedException(
        'Tài khoản hoặc mật khẩu không chính xác! ',
      );
    }

    res.cookie('_id', validUser._id);
    res.json({ success: true, data: validUser });
  }
}

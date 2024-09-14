import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddUserDto } from 'src/modules/user/dto/add-user.dto';
import { UserLoginDto } from 'src/modules/user/dto/user-login.dto';
import { User, UserDocument } from 'src/modules/user/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async registerAccount(addUserDto: AddUserDto) {
    try {
      const createdUser = await new this.userModel(addUserDto).save();
      return createdUser;
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException();
    }
  }

  async login(loginDto: UserLoginDto): Promise<UserDocument | never> {
    try {
      const validUser = await this.userModel.findOne({
        username: loginDto.username,
        password: loginDto.password,
      });

      return validUser;
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException();
    }
  }
}

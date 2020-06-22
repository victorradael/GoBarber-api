import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import uploadConfig from '@config/upload';
import AppError from '@shared/error/AppError';

interface RequestDTO {
  user_id: string;
  avatarFilename: string;
}

@injectable()
export default class UpdateAvatarService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}
  public async execute({ user_id, avatarFilename }: RequestDTO): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only autenthicated users can change avatar.', 401);
    }

    if (user.avatar) {
      //delete previous avatar

      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.userRepository.save(user);

    return user;
  }
}

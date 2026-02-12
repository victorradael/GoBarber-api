import { Repository } from 'typeorm';
import { PostgresDataSource } from '@shared/infra/typeorm/data-sources';

import UserToken from '../entities/UserToken';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';


class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = PostgresDataSource.getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken || undefined;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({ user_id });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;

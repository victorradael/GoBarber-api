import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHasProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/error/AppError';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHasProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'testador',
      email: 'testador@teste.com',
      password: '123teste',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('testador');
    expect(user.email).toBe('testador@teste.com');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHasProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: 'testador',
      email: 'testador@teste.com',
      password: '123teste',
    });

    await expect(
      createUser.execute({
        name: 'testador',
        email: 'testador@teste.com',
        password: '123teste',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

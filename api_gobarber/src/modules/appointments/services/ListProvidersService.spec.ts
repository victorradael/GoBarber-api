import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import AppError from '@shared/error/AppError';

let fakeUsersRepository: FakeUsersRepository;

let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Testador 1',
      email: 'testador1@teste.com',
      password: '123teste',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Testador 2',
      email: 'testador2@teste.com',
      password: '123teste',
    });

    const user3 = await fakeUsersRepository.create({
      name: 'Testador 3',
      email: 'testador3@teste.com',
      password: '123teste',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Logged User',
      email: 'loggeduser@teste.com',
      password: '123teste',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2, user3]);
  });
});

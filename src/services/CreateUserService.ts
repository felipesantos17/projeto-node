import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppErrors from '../errors/AppError';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppErrors('Email address already used.');
    }

    const hashedpassword = await hash(password, 8);

    // cria a instancia do objeto mas não salva
    // por isso está sem AWAIT
    const user = usersRepository.create({
      name,
      email,
      password: hashedpassword,
    });

    // isso vai salvar o usuário no Banco de Dados
    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;

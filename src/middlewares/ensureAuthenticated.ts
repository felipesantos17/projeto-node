import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppErrors from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // validação do token JWT

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppErrors('JWT token is missing', 401);
  }

  // só colocar virugla antes, significa que vamos ignorar a primeira parte do vetor
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    // méotdo utilizado para forçar um tipo dentro de uma palicação
    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppErrors('Invalid JWT token', 401);
  }
}

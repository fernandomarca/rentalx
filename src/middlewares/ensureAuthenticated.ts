import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRespository";
interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [_, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "aae023ca4d362ee6c6b79dcf9a196101"
    ) as IPayload;
    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("User does not exists!", 401);
    }
    next();
  } catch (error) {
    throw new AppError("Invalid Token!", 401);
  }
}

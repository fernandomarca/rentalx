import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authenticateUseCase = container.resolve(AuthenticateUserUseCase);

    const token = await authenticateUseCase.execute({ password, email });

    return response.json(token);
  }
}

export { AuthenticateUserController };

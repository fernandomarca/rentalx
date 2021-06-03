import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalsByUserUseCase } from "./ListRentalsByUSerUseCase";

class ListRentalsByUserController {
  async handle(request: Request, response: Response) {
    const listRentalsByUserUseCase = container.resolve(
      ListRentalsByUserUseCase
    );

    const { id } = request.user;

    const rentals = await listRentalsByUserUseCase.execute(id);

    return response.json(rentals);
  }
}

export { ListRentalsByUserController };

import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateCarUseCase } from "./CreateCarUseCase";
class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    } = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({
      id,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    return response.status(201).json(car);
  }
}

export { CreateCarController };

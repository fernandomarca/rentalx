import { Response, Request } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const category = this.createCategoryUseCase.execute({ name, description });

    return response.status(201).json(category);
  }
}

export { CreateCategoryController };

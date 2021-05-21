import { Category } from "@modules/cars/infra/typeorm/entities/Category";

//DTO => Data transfer object
interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<Category>;
}

export { ICategoriesRepository, ICreateCategoryDTO };

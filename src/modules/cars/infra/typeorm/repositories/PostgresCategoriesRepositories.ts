import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";
class PostgresCategoriesRepository implements ICategoriesRepository {
  findByName(name: string){
    console.log(name);
    return null;
  }
  list() {
    return null;
  }
  create({ name, description }: ICreateCategoryDTO) {
    console.log(name, description);
    return null;
  }
}

export { PostgresCategoriesRepository };

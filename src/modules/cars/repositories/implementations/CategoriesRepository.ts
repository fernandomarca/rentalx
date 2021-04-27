import { Category } from "../../model/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

//singleton
class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];
  private static INSTANCE: CategoriesRepository;
  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): Category {
    const category = new Category();
    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
    return category;
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}

export { CategoriesRepository };

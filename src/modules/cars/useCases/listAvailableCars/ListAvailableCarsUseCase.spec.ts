import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });
  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      brand: "car brand",
      category_id: "category_id",
      daily_rate: 110.0,
      fine_amount: 40,
      license_plate: "DEF-1236",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car description",
      brand: "car brand",
      category_id: "category_id",
      daily_rate: 110.0,
      fine_amount: 40,
      license_plate: "DEF-1236",
    });

    car2.available = false;

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars.length).toBe(1);
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      brand: "car brand_test",
      category_id: "category_id",
      daily_rate: 110.0,
      fine_amount: 40,
      license_plate: "DEF-1236",
    });

    await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car description",
      brand: "car brand_two",
      category_id: "category_id",
      daily_rate: 110.0,
      fine_amount: 40,
      license_plate: "DEF-1236",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "car brand_test",
    });
    expect(cars.length).toBe(1);
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car description",
      brand: "car brand_test",
      category_id: "category_id",
      daily_rate: 110.0,
      fine_amount: 40,
      license_plate: "DEF-1236",
    });

    await carsRepositoryInMemory.create({
      name: "Car4",
      description: "Car description",
      brand: "car brand_two",
      category_id: "category_id",
      daily_rate: 110.0,
      fine_amount: 40,
      license_plate: "DEF-1236",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3",
    });
    expect(cars.length).toBe(1);
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car5",
      description: "Car description",
      brand: "car brand_test",
      category_id: "12345",
      daily_rate: 110.0,
      fine_amount: 40,
      license_plate: "DEF-1236",
    });

    await carsRepositoryInMemory.create({
      name: "Car6",
      description: "Car description",
      brand: "car brand_two",
      category_id: "category_id",
      daily_rate: 110.0,
      fine_amount: 40,
      license_plate: "DEF-1236",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });
    expect(cars.length).toBe(1);
    expect(cars).toEqual([car]);
  });
});

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in_memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import dayjs from "dayjs";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car teste",
      description: "Car teste",
      daily_rate: 100,
      license_plate: "AAA-0000",
      fine_amount: 80,
      brand: "brand teste",
      category_id: "category teste",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(car.available).toBe(false);
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car teste",
      description: "Car teste",
      daily_rate: 100,
      license_plate: "AAA-0000",
      fine_amount: 80,
      brand: "brand teste",
      category_id: "category teste",
    });
    const car2 = await carsRepositoryInMemory.create({
      name: "Car teste 2",
      description: "Car teste 2",
      daily_rate: 100,
      license_plate: "AAA-0002",
      fine_amount: 80,
      brand: "brand teste",
      category_id: "category teste",
    });

    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: car2.id,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"));
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    //podia ser um rental fake
    const car = await carsRepositoryInMemory.create({
      name: "Car teste",
      description: "Car teste",
      daily_rate: 100,
      license_plate: "AAA-0000",
      fine_amount: 80,
      brand: "brand teste",
      category_id: "category teste",
    });

    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });
    await expect(
      createRentalUseCase.execute({
        user_id: "123456",
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121313",
        expected_return_date: dayjsDateProvider.dateNow(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "@modules/cars/useCases/createCar/CreateCarUseCase";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in_memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import dayjs from "dayjs";
import { CreateRentalUseCase } from "../createRental/CreateRentalUseCase";
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;
let devolutionRentalUseCase: DevolutionRentalUseCase;
let dateProvider: DayjsDateProvider;

describe("Devolution Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  const start_date_Fake = dayjs().subtract(2, "day").toDate(); // para testar com data retroativa
  const expected_return_date_Fake = dayjs().subtract(1, "day").toDate();

  beforeEach(() => {
    rentalRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    dateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dateProvider,
      carsRepositoryInMemory
    );
    devolutionRentalUseCase = new DevolutionRentalUseCase(
      rentalRepositoryInMemory,
      carsRepositoryInMemory,
      dateProvider
    );
  });

  it("Should be able devolution a rental at 24 hours with not delay", async () => {
    const car = await createCarUseCase.execute({
      name: "Car teste",
      description: "Car teste",
      daily_rate: 100,
      license_plate: "AAA-0000",
      fine_amount: 80,
      brand: "brand teste",
      category_id: "category teste",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "123456",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    const devolutionRental = await devolutionRentalUseCase.execute({
      id: rental.id,
      user_id: "123456",
    });
    //entrega antes das 24 horas - diária mínima
    expect(devolutionRental.total).toBe(100);
  });

  it("Should be able devolution a rental post 24 hours with delay", async () => {
    const car = await createCarUseCase.execute({
      name: "Car teste",
      description: "Car teste",
      daily_rate: 100,
      license_plate: "AAA-0000",
      fine_amount: 80,
      brand: "brand teste",
      category_id: "category teste",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "123456",
      car_id: car.id,
      expected_return_date: expected_return_date_Fake,
      start_date: start_date_Fake,
    });

    const devolutionRental = await devolutionRentalUseCase.execute({
      id: rental.id,
      user_id: "123456",
    });

    expect(devolutionRental.total).toBe(180);
    // console.log(devolutionRental);
  });
});

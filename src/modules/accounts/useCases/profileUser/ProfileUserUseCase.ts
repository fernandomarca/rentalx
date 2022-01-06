import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject,injectable } from "tsyringe";

@injectable()
class ProfileUserUseCase{

  constructor(
    @inject("UsersRepository")
    private usersRepository:IUsersRepository
  ){}

  async execute(id:string):Promise<IUserResponseDTO>{
    const user = await this.usersRepository.findById(id);
    const userMap = UserMap.toDTO(user);
    return userMap;
  }
}

export{ProfileUserUseCase}
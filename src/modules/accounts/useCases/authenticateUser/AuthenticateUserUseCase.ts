import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    //Usuário existe
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new Error("Email or password incorrect!");
    }
    const passwordMatch = await compare(password, user.password);
    //senha está correta
    if (!passwordMatch) {
      throw new Error("Email or password incorrect!");
    }
    //gerar jsonwebtoken
    // Your Hash: aae023ca4d362ee6c6b79dcf9a196101
    // Your String: fernandomarcamagalhaesignetirentX
    const token = sign({}, "aae023ca4d362ee6c6b79dcf9a196101", {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user: {
        name: user.name,
        email,
      },
      token,
    };
  }
}

export { AuthenticateUserCase };

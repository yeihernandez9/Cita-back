import { RegisterUserDTO } from "./../dtos/RegisterUserDTO";
import AppDataSource from "../config/ormconfig";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginUserDTO } from "../dtos/LoginUserDTO";

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  public async registerUser(registerDto: RegisterUserDTO): Promise<any> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { username: registerDto.username },
      });

      if (existingUser) {
        return {
          statusCode: 409,
          message: "El nombre de usuario ya existe",
          user: null,
        };
      }

      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      const user = new User();
      user.username = registerDto.username;
      user.password = hashedPassword;
      user.roles = registerDto.roles || ['user'];

      const savedUser = await this.userRepository.save(user);

      return {
        statusCode: 201,
        message: "Usuario registrado exitosamente",
        user: {
          username: savedUser.username,
          roles: savedUser.roles,
        },
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Error en el proceso de registro",
        user: null,
      };
    }
  }

  public async loginUser(loginDTO: LoginUserDTO): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: { username: loginDTO.username },
      });

      if (!user) {
        return {
          statusCode: 404,
          message: "Usuario no encontrado",
          user: null,
          token: null,
        };
      }

      const isPasswordCorrect = await bcrypt.compare(loginDTO.password, user.password);
      if (!isPasswordCorrect) {
        return {
          statusCode: 401,
          message: "Credenciales incorrectas",
          user: null,
          token: null,
        };
      }

      const token = jwt.sign(
        { username: user.username, roles: user.roles },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1h" }
      );

      return {
        statusCode: 200,
        message: "Autenticación exitosa",
        user: { username: user.username, roles: user.roles },
        token,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Error en el proceso de autenticación",
        user: null,
        token: null,
      };
    }
  }

}

import { Request, Response } from 'express';
import { RegisterUserDTO } from '../dtos/RegisterUserDTO';
import { AuthService } from '../services/AuthService';
import { LoginUserDTO } from '../dtos/LoginUserDTO';

class AuthController{
    private authService: AuthService;

    constructor(){
        this.authService = new AuthService();
    }
   
    public async register(req: Request, res: Response){
        try{
            const { username, password, roles } = req.body as {username: string, password: string, roles: string};

            const userDTO = new RegisterUserDTO(username, password, [roles]);
            console.log(userDTO)
            const user = await this.authService.registerUser(userDTO);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
          }
    }

    public async login(req: Request, res: Response) {
        const { username, password } = req.body as {username: string, password: string};
        const userDTO = new LoginUserDTO(username, password);
        const data = await this.authService.loginUser(userDTO);
        
        res.status(200).json({ data });
      }
}

export default new AuthController();
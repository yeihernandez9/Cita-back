import { Request, Response } from 'express';
import { CreateDoctorDTO } from "../dtos/CreateDoctorDTO";
import { DoctorService } from "../services/DoctorService";

class DoctorController{

  private doctorService: DoctorService;

  constructor() {
    this.doctorService = new DoctorService();
  }

  public async createDoctor(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, description } = req.body as { name: string; email: string; description: string };

      const userDTO = new CreateDoctorDTO(name, email, description);

      const doctor = await this.doctorService.createDoctor(userDTO);

      res.status(201).json(doctor);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async getAllDoctors(req: Request, res: Response): Promise<void> {
    try {
      const doctors = await this.doctorService.getAllDoctors();
      res.status(200).json(doctors);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }


  public async deleteDoctor(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    await this.doctorService.deleteDoctor(id);
    res.status(204).send();
  }

}

export default new DoctorController();
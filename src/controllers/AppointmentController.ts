import { Request, Response } from 'express';
import { AppointmentService } from './../services/AppointmentService';
import { RegisterAppointmentDTO } from '../dtos/RegisterAppointmentDTO';
class AppointmentController{
    private appointmentService: AppointmentService;

    constructor() {
        this.appointmentService = new AppointmentService();
    }

    public async createAppointment(req: Request, res: Response): Promise<void>{
        try {
            const { patient, doctor, date, time, appointmentType} = req.body as { patient: number, doctor: number; date: string, time: string, appointmentType: string };
      
            const appointmentDTO = new RegisterAppointmentDTO(patient, doctor, date, time, appointmentType);
            console.log(req.body);
    
            const appointment = await this.appointmentService.createAppointment(appointmentDTO);
      
            res.status(201).json(appointment);
          } catch (error: any) {
            res.status(400).json({ message: error.message });
          }
    }

    public async getAppointment(req: Request, res: Response): Promise<void> {
      try {
        const appointment = await this.appointmentService.getAppointment();
        res.status(200).json(appointment);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    }

    public async getAppointmentById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            const appointment = await this.appointmentService.getAppointmentById(id);
            res.status(200).json(appointment);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

  
    public async updateAppointment(req: Request, res: Response): Promise<void> {
      try {
          const id = parseInt(req.params.id, 10); // Obtener el ID de los parámetros de la URL
          const appointmentData = req.body; // Obtener los datos de la cita del cuerpo de la solicitud
          const updatedAppointment = await this.appointmentService.updateAppointment(id, appointmentData);
          res.status(200).json(updatedAppointment);
      } catch (error: any) {
          res.status(500).json({ message: error.message });
      }
  }

  public async deleteAppointment(
    req: Request, res: Response
): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
        const result = await this.appointmentService.deleteAppointment(id);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

}

export default new AppointmentController();
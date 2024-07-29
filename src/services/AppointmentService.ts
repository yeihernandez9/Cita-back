import AppDataSource from "../config/ormconfig";
import { Doctor } from "../entity/Doctor";
import { User } from "../entity/User";
import { RegisterAppointmentDTO } from "./../dtos/RegisterAppointmentDTO";
import { Appointment } from "./../entity/Appointment";
export class AppointmentService {
  private appointmentRepository = AppDataSource.getRepository(Appointment);
  private doctorRepository = AppDataSource.getRepository(Doctor);
  private userRepository = AppDataSource.getRepository(User);

  public async createAppointment(registerDto: RegisterAppointmentDTO) {
    try {
      // Find the doctor and user by their names (or IDs if you prefer)
      const doctor = await this.doctorRepository.findOne({
        where: { id: registerDto.doctor },
      });
      const user = await this.userRepository.findOne({
        where: { id: registerDto.patient },
      });

      if (!doctor || !user) {
        return {
          statusCode: 404,
          message: "Doctor or User not found",
          data: null,
        };
      }

      const appointment = new Appointment();
      appointment.doctor = doctor;
      appointment.user = user;
      appointment.date = registerDto.date;
      appointment.time = registerDto.time;
      appointment.appointmentType = registerDto.appointmentType;

      const savedAppointment = await this.appointmentRepository.save(
        appointment
      );

      return {
        statusCode: 201,
        message: "Appointment created successfully",
        data: savedAppointment,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "An error occurred while creating the appointment",
        data: null,
      };
    }
  }
  public async getAppointment() {
    const appointments = await this.appointmentRepository.find({
      relations: ["doctor", "user"],
    });
    return appointments;
  }

  public async getAppointmentById(id: number) {
    try {
      const appointment = await this.appointmentRepository.findOne({
        where: { id },
        relations: ["doctor", "user"],
      });

      if (!appointment) {
        return {
          statusCode: 404,
          message: "Appointment not found",
          data: null,
        };
      }

      return {
        statusCode: 200,
        message: "Appointment retrieved successfully",
        data: appointment,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "An error occurred while retrieving the appointment",
        data: null,
      };
    }
  }
  public async updateAppointment(
    id: number,
    appointmentData: Partial<Appointment>
  ): Promise<{
    statusCode: number;
    message: string;
    data: Appointment | null;
  }> {
    try {
      const appointment = await this.appointmentRepository.findOne({
        where: { id },
      });
      if (!appointment) {
        return {
          statusCode: 404,
          message: "Appointment not found",
          data: null,
        };
      }

      Object.assign(appointment, appointmentData);

      await this.appointmentRepository.save(appointment);

      return {
        statusCode: 200,
        message: "Appointment updated successfully",
        data: appointment,
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        message: `Error updating appointment: ${error.message}`,
        data: null,
      };
    }
  }
  async deleteAppointment(id: number) {
    console.log(id)
    await this.appointmentRepository.delete(id);
    return "Appointment deleted";
  }
}

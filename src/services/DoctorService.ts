import { promises } from "dns";
import AppDataSource from "../config/ormconfig";
import { CreateDoctorDTO } from "../dtos/CreateDoctorDTO";
import { Doctor } from "../entity/Doctor";

export class DoctorService {
  private doctorRepository = AppDataSource.getRepository(Doctor);

  public async createDoctor(createDoctorDTO: CreateDoctorDTO): Promise<Doctor> {
    const doctor = new Doctor();
    doctor.name = createDoctorDTO.name;
    doctor.email = createDoctorDTO.email;
    doctor.description = createDoctorDTO.description;

    return this.doctorRepository.save(doctor);
  }

  public async getAllDoctors(): Promise<Doctor[]> {
    return await this.doctorRepository.find();
  }

  async deleteDoctor(id: number): Promise<void> {
    await this.doctorRepository.delete({ id });
  }
}

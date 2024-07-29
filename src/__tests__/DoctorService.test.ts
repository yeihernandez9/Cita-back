import { DoctorService } from '../services/DoctorService';
import { CreateDoctorDTO } from '../dtos/CreateDoctorDTO';
import { Doctor } from '../entity/Doctor';
import AppDataSource from '../config/ormconfig';
import { Repository, DeleteResult } from 'typeorm';

jest.mock('../config/ormconfig');

describe('DoctorService', () => {
  let doctorService: DoctorService;
  let doctorRepository: Repository<Doctor>;

  beforeAll(() => {
    doctorRepository = AppDataSource.getRepository(Doctor);
    doctorService = new DoctorService();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a doctor', async () => {
    const createDoctorDTO: CreateDoctorDTO = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      description: 'Cardiologist',
      validate: function (): void {
        throw new Error('Function not implemented.');
      }
    };

    const doctor = new Doctor();
    doctor.name = createDoctorDTO.name;
    doctor.email = createDoctorDTO.email;
    doctor.description = createDoctorDTO.description;

    jest.spyOn(doctorRepository, 'save').mockResolvedValue(doctor);

    const result = await doctorService.createDoctor(createDoctorDTO);

    expect(doctorRepository.save).toHaveBeenCalledWith(doctor);
    expect(result).toEqual(doctor);
  });

  it('should get all doctors', async () => {
    const doctors: Doctor[] = [
      {
        id: 1, name: 'John Doe', email: 'john.doe@example.com', description: 'Cardiologist',
        appointments: []
      },
      {
        id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', description: 'Neurologist',
        appointments: []
      },
    ];

    jest.spyOn(doctorRepository, 'find').mockResolvedValue(doctors);

    const result = await doctorService.getAllDoctors();

    expect(doctorRepository.find).toHaveBeenCalled();
    expect(result).toEqual(doctors);
  });

  it('should delete a doctor', async () => {
    const doctorId = 1;

    const deleteResult: DeleteResult = { affected: 1, raw: [] };

    jest.spyOn(doctorRepository, 'delete').mockResolvedValue(deleteResult);

    await doctorService.deleteDoctor(doctorId);

    expect(doctorRepository.delete).toHaveBeenCalledWith({ id: doctorId });
  });
});
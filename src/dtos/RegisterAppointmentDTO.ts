
export class RegisterAppointmentDTO {
  patient: number;
  doctor: number;
  date: string;
  time: string;
  appointmentType: string;

  constructor(patient: number, doctor: number, date: string, time: string, appointmentType: string){
    this.patient = patient;
    this.doctor = doctor;
    this.date = date;
    this.time = time;
    this.appointmentType = appointmentType;
  }

}
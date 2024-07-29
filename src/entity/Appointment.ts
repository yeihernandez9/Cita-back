import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Doctor } from './Doctor';
import { User } from './User';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Doctor, doctor => doctor.appointments)
  doctor: Doctor;

  @ManyToOne(() => User, user => user.appointments)
  user: User;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  appointmentType: string;
}
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;


  @Column()
  description: string;

  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointments: Appointment[];
    
}
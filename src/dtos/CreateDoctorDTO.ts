export class CreateDoctorDTO {
    name: string;
    email: string;
    description: string;
  
    constructor(name: string, email: string, description: string) {
      this.name = name;
      this.email = email;
      this.description = description;
    }

    validate() {
      if (!this.email.includes('@')) {
        throw new Error('Invalid email format');
      }
      // Más validaciones aquí
    }
  }
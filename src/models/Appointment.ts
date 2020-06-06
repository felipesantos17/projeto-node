import { uuid } from 'uuidv4';

class Appointment {
  id: string;

  provider: string;

  date: Date;

  // o Omit recebe 2 "parametros" o 1º primeiro, qual é o tipo
  // e o 2º segundo, qual eu quero omitir
  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;

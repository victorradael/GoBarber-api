import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointment from '@modules/appointments/dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointment): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}

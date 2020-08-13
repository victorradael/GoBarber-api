import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointment from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProvider from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProvider from '../dtos/IFindAllInDayFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointment): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProvider
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindAllInDayFromProvider
  ): Promise<Appointment[]>;
}

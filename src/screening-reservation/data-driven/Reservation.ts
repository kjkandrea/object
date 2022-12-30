import {Screening} from './Screening';
import {Money} from '../global/Money';
import {Customer} from './Customer';

export class Reservation {
  private customer: Customer;
  private screening: Screening;
  private fee: Money;
  private audienceCount: number;
}
